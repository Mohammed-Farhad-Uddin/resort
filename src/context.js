import React, { Component } from 'react';
import items from './data';



const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        //
        type: "all",
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    componentDidMount() {
        console.log(items)
        let rooms = this.formatData(items);//ei item hocce import kora items ta 
        let featuredRooms = rooms.filter(room => room.featured === true);
        console.log(...rooms)

        let maxPrice = Math.max(...rooms.map(item => item.price))
        // console.log(...rooms.map(item => item.price))
        let maxSize = Math.max(...rooms.map(item => item.size))


        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize
        })
    }

    formatData(items) {//ei kane items ke parameter hisabe pacce
        let tempItems = items?.map(item => {
            let id = item?.sys?.id;
            let images = item?.fields?.images?.map(image => image?.fields?.file?.url);
            let room = { ...item.fields, images: images, id: id };//ei kane items.fileds er modde images jei ta ace oi ta te uporer line e let images jei ta paici oi overide hoye bosbe and item.fields er modde id nai kintu ekn id tao add hobe same way te overide hobe 
            return room;
        })
        return tempItems;
    }

    getRoom = (slug) => {
        let tempItems = [...this.state.rooms];
        const room = tempItems.find(room => room.slug === slug);
        return room;
    }

    handleChange = (event) => {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        },
            this.filterRooms//jkn handlechange call hobe [name]:value set hole filterRooms function call hobe
        )
    };

    filterRooms = () => {
        let { rooms,
            type,
            capacity,
            price,
            minSize,
            maxSize,
            breakfast,
            pets } = this.state;

        let tempRooms = [...rooms];
        // transform values
        // get capacity
        capacity = parseInt(capacity);
        price = parseInt(price);
        // filter by type
        if (type !== "all") {
            tempRooms = tempRooms.filter(room => room.type === type);
        }
        // filter by capacity
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }
        // filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);
        //filter by size
        tempRooms = tempRooms.filter(
            room => room.size >= minSize && room.size <= maxSize
        );
        //filter by breakfast
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true);
        }
        //filter by pets
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true);
        }
        this.setState({
            sortedRooms: tempRooms
        });
    }

    render() {
        return (
            <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange }}>
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}


export { RoomProvider, RoomConsumer, RoomContext };
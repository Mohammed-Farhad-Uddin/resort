import React from 'react';
import { RoomConsumer, withRoomConsumer } from '../context';
import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
import Loading from './Loading';




function RoomContainer({ context }) {
  const { loading, sortedRooms, rooms } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </>
  );
}

export default withRoomConsumer(RoomContainer);



// const RoomsContainer = () => {
//     return (
//         <RoomConsumer>
//               {value => {
//                 const { loading, setRoom, sortedRooms,rooms } = value;
//                 if (loading) {
//                   return <Loading />;
//                 }
//                 return (
//                   <>
//                     <RoomsFilter rooms={rooms} />
//                     <RoomsList rooms={sortedRooms} setRoom={setRoom} />
//                   </>
//                 );
//               }}
//             </RoomConsumer>
//     );
// };

// export default RoomsContainer;
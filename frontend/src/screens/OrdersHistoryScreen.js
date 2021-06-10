import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { listOrderMine } from '../actions/orderAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrdersHistoryScreen(props) {
    const orderMineList = useSelector(state => state.orderMineList); //react-redux
    const {loading,error,orders} = orderMineList;

    const dispatch = useDispatch(); //react-redux
    useEffect(() =>{
        dispatch(listOrderMine()); //call orderAction
    },[dispatch])

    return (
        <div>
            <h>Order History</h>
            {loading ? (<LoadingBox></LoadingBox>) : //loading
             error? (<MessageBox variant="danger">{error}</MessageBox>) // if error show => error
             :
             ( // if no error
                 <table className="table">
                     <thead>
                         <tr>
                             <th>ID</th>
                             <th>Date</th>
                             <th>Total</th>
                             <th>PAID</th>
                             <th>DELIVERED</th>
                             <th>ACTIONS</th>
                         </tr>
                     </thead>
                     <tbody>
                         {orders.map((order)=>(
                             <tr key={order._id}>
                                 <td>{order._id}</td>
                                 <td>{order.createdAt.substring(0,10)}</td>
                                 <td>{order.totalPrice.toFixed(2)}</td>
                                 <td>{order.isPaid ? order.paidAt.substring(0,10) : 'No'}</td>           {/* boolean*/}
                                 <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : 'No'}</td> {/* boolean*/}
                                 
                                 <button type="button" className="small"
                                 onClick ={()=>{props.history.push(`/order/${order._id}`)}}>Details</button>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             )
            }
        </div>
    )
}

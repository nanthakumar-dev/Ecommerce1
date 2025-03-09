import {useSelector} from "react-redux"
import {useEffect,Fragment} from "react"
import {MDBDataTable} from "mdbreact"
import { userOrderAction} from "../../Actions/orderAction"
import {useDispatch} from "react-redux"
import { Link } from "react-router-dom"
export default function MyOrder(){
    const {userOrder}=useSelector(state=>state.orderState)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(userOrderAction)
    },[dispatch])
    
    function userData(){
        const data={
            columns:[
                {
                    label:'Order-ID',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'NumerOfItem',
                    field:'numofitem',
                    
                    sort:'asc'
                },
                {
                    label:'Amount',
                   field:'amount',
                    sort:'asc'
                },
                
                {
                    label:'Status',
                    field:'status',
                    sort:'asc'
                },
                {
                    label:'Action',
                    field:'action',
                    sort:'asc'
                }
            ],
            rows:[]
        }
        
            userOrder&&userOrder.forEach(userorder=>{
                data.rows.push(
                    {
                        id:userorder._id,
                        numofitem:userorder.orderItems.length,
                        amount:`$${userorder.totalPrice}`,
                        status:userorder.orderStatus.includes("pending")?(<p style={{'color':'red'}} >Pending</p>):(<p color={{'colcor':'green'}}>Delivered</p>),
                        action:<Link to={`/order/${userorder._id}`} ><i className="fa fa-eye"></i></Link>
                    }
                )
            })
        
        return data
    }
    return(
        <Fragment className="container-fluid">

            <h1>My Order</h1>
            <MDBDataTable
            className="px-3"
            bordered
            striped
            hover
            data={userData()}
            />
        </Fragment>

    )
}
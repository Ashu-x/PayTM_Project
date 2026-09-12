import {Appbar} from '../Components/Appbar'
import {Users} from '../Components/Users'
import {Balance} from '../Components/Balance'

const Dashboard = () =>{
    return (
        <div>
            <Appbar/>
            <div className="m-8">
                <Balance value={"10000"} />
                <Users />
            </div>
        </div>
    )
}

export default Dashboard
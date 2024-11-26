import React, { useContext } from 'react'
import {RouteProps, RouteComponentProps, Route, Redirect} from 'react-router-dom';
import { RootStoreContext } from '../stores/rootStore';
import { is } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';


interface IProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>>
}

const PrivateRoute: React.FC<IProps> = ({component: Component, ...rest}) => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn} = rootStore.userStore;
    const {openModal} = rootStore.modalStore;

    return (
        <Route
            {...rest}
            render={(props)=>isLoggedIn ? <Component { ...props}/> :   <Redirect to={'/signup'}/>}
        />
    )
}

export default observer(PrivateRoute);
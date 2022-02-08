import React from 'react';
import {Menu, Button, Container} from 'semantic-ui-react';

interface Props {
    openForm:()=>void;
}
export default function NavBar({openForm}:Props){
    return(
        <Container>
        <Menu 
            secondary
            fixed="top"
            pointing
            size="tiny"
            style={{ backgroundColor: "aliceBlue" }}
        >
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo"/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities"/>
                <Menu.Item>
                    <Button onClick={openForm} positive content="Create Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
        </Container>

    )
}
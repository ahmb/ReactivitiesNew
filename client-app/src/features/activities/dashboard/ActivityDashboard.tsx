import React from 'react'
import { Grid, GridColumn, List } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { ActivityList } from './ActivityList';

interface IProps {
    activities: IActivity[]
}

//demonstrates :
//1. Inherit from React FC (Functional Component) which can take props
//2. destructring the activities out of props
//3. loop over the array of Activities
const ActivityDashboard: React.FC<IProps> =({activities}) => {
    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityList activities={activities} />
                {/* <List>
                {activities.map((activity) => (
                    <List.Item key={activity.id}>{activity.title}</List.Item>
                ))}
                </List> */}
            </GridColumn>
        </Grid>
    );
};

export default ActivityDashboard;
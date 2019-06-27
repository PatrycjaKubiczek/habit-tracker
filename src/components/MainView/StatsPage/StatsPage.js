import React, { Component } from 'react';

// COMPONENTS
import Stats from './Stats.js';

// STYLES
import { ContainerApp, RowSubtitle } from './../MainPageStyle.js'
import { ContainerStats } from './StatsPageStyle'


class StatsPage extends Component {
    render() {
        return (
            <ContainerApp style={{flexDirection: 'column'}}>
                <RowSubtitle>
                    <h2 className="text-left">Statystki</h2>
                </RowSubtitle>
                <ContainerStats>
                    {
                        this.props.habits.map((habit) => <Stats habit={habit} key={habit.idkey} />)
                    }
                </ContainerStats>
            </ContainerApp>
        );
    }
}

export default StatsPage;
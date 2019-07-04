import React, { Component } from 'react';
// COMPONENTS
import Stats from './Stats.js';

// STYLES
import { ContainerApp, RowSubtitle } from './../MainPageStyle.js'
import { ContainerStats } from './StatsPageStyle'


class StatsPage extends Component {
    render() {
        return (
            <ContainerApp style={{ flexDirection: 'column' }}>
                <RowSubtitle>
                    <h2 className="text-left">Statystyki  - {this.props.currentMonthDate}</h2>
                </RowSubtitle>
                {
                    this.props.habits && this.props.habits.length !== 0 ?
                        <ContainerStats>
                            {
                                this.props.habits.map((habit) => <Stats habit={habit} key={habit.idkey} currentMonthDate={this.props.currentMonthDate} />)
                            }
                        </ContainerStats>
                        :
                        <p>Brak nawyków</p>
                }
            </ContainerApp>
        );
    }
}

export default StatsPage;
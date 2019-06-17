import React from 'react';
import ReactMinimalPieChart from 'react-minimal-pie-chart';

export default class ProgressPercentageChart extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ReactMinimalPieChart
			data={[{
				value: this.props.percentage,
				color: '#28a745',
				startOffset: 0,
			}]}
			cy={50}
			cx={50}
			totalValue={100}
			lineWidth={20}
			startAngle={270}
			rounded
			// animate
			label={({ data, dataIndex }) =>
			Math.round(data[dataIndex].percentage) + '%'
		}
		labelStyle={{
			fontSize: '25px',
			fontFamily: 'sans-serif'
		}}
		labelPosition={0}
		style={{width: "100px", height: "100px", margin: '10px'}}
		/>
		);
	}
}

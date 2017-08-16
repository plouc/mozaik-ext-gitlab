import React, { Component } from 'react'
import { ResponsiveBubble } from 'nivo'
import LabelsChart from './LabelsChart'

const margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
}

export default class LabelsBubble extends Component {
    static getApiRequest = LabelsChart.getApiRequest

    render() {
        return (
            <LabelsChart {...this.props}>
                {({ labels, countBy, animate }) => {
                    const data = {
                        name: 'labels',
                        color: '#000',
                        children: labels,
                    }

                    return (
                        <ResponsiveBubble
                            root={data}
                            margin={margin}
                            labelSkipRadius={12}
                            value={countBy}
                            label={d => `${d.name} ${d[countBy]}`}
                            labelTextColor="inherit:darker(1.6)"
                            leavesOnly={true}
                            colorBy={d => d.color}
                            animate={animate}
                        />
                    )
                }}
            </LabelsChart>
        )
    }
}

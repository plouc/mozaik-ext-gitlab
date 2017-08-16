import React, { Component } from 'react'
import { ResponsiveTreeMap } from 'nivo'
import LabelsChart from './LabelsChart'

export default class LabelsTreemap extends Component {
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
                        <ResponsiveTreeMap
                            root={data}
                            tile="squarify"
                            labelSkipSize={12}
                            identity="id"
                            value={countBy}
                            label={d => `${d.name} ${d[countBy]}`}
                            labelTextColor="inherit:darker(1.6)"
                            leavesOnly={true}
                            outerPadding={10}
                            innerPadding={2}
                            colorBy={d => d.color}
                            animate={animate}
                        />
                    )
                }}
            </LabelsChart>
        )
    }
}

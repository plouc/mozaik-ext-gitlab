import React, { Component } from 'react'
import { ResponsivePie } from 'nivo'
import LabelsChart from './LabelsChart'

export default class LabelsPie extends Component {
    static getApiRequest = LabelsChart.getApiRequest

    render() {
        return (
            <LabelsChart {...this.props}>
                {({ labels, countBy, animate }) => {
                    const data = labels.map(label => ({
                        ...label,
                        id: `${label.id}`,
                        value: label[countBy],
                    }))

                    return (
                        <ResponsivePie
                            data={data}
                            colorBy={d => d.color}
                            innerRadius={0.6}
                            label={d => `${d.name} ${d[countBy]}`}
                            animate={animate}
                        />
                    )
                }}
            </LabelsChart>
        )
    }
}

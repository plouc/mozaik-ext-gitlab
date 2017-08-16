import React, { Component } from 'react'
import { ResponsivePie } from 'nivo'
import LabelsChart from './LabelsChart'

const margin = {
    top: 30,
    right: 60,
    bottom: 30,
    left: 60,
}

const skipAngle = 5

export default class LabelsPie extends Component {
    static getApiRequest = LabelsChart.getApiRequest

    render() {
        return (
            <LabelsChart {...this.props}>
                {({ labels, countBy, animate, theme }) => {
                    const data = labels.map(label => ({
                        ...label,
                        id: `${label.id}`,
                        label: label.name,
                        value: label[countBy],
                    }))

                    return (
                        <ResponsivePie
                            data={data}
                            margin={margin}
                            colorBy={d => d.color}
                            innerRadius={0.6}
                            padAngle={1}
                            radialLabel="name"
                            radialLabelsSkipAngle={skipAngle}
                            slicesLabel={countBy}
                            slicesLabelsSkipAngle={skipAngle}
                            slicesLabelsTextColor="inherit:darker(1.6)"
                            animate={animate}
                            theme={theme}
                        />
                    )
                }}
            </LabelsChart>
        )
    }
}

import React, { Component } from 'react';
import './style.scss';

export default class TableLayout extends Component {
    render () {
        const {className,
               numberOfRows,
               onCellClick, cellData} = this.props;

        let {numberOfCols} = this.props;

        if (!numberOfCols && numberOfRows) {
            numberOfCols = numberOfRows;
        }
        const rowClassName = `${className}__row`,
              cellClassName = `${className}__cell`;
        return (
            <div className={className}>
                {[...Array(+numberOfRows)].map((x, i) => {
                    return (
                        <Row numberOfCells={numberOfCols}
                             className={rowClassName}
                             cellClassName={cellClassName}
                             onCellClick={onCellClick}
                             dataRowId={i}
                             cellData={cellData}
                             key={i + 1} />
                    )}
                )}
            </div>
        )
    }
}
export class Row extends Component {
    render () {
        const {numberOfCells,
               className, cellClassName,
               onCellClick, dataRowId, cellData} = this.props;

        const prevCellsCount = dataRowId * (+numberOfCells);
        return (
            <div className={className}>
                {[...Array(+numberOfCells)].map((x, i) =>
                    <div className={cellClassName}
                         key={i + 1}
                         data-cell-id={i + prevCellsCount}
                         onClick={onCellClick}>
                        {cellData[i + prevCellsCount]}
                    </div>
                )}
            </div>
        )
    }
}

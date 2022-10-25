import React from 'react';
import './raw.scss'

const Raw = ({left, right}) => {
    return (
        <div className="row mb-2">
            <div className="col-md-6">
                {left}
            </div>
            <div className="col-md-6">
                {right}
            </div>
        </div>
    );
};

export default Raw;
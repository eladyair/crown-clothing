import React from 'react';
import { connect } from 'react-redux';
import './directory.component.scss';

// Component
import MenuItem from '../menu-item/menu-item.component';
// Redux related
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

const Directory = ({ sections }) => (
    <div className='directory-menu'>
        {sections.map(({ id, ...otherSectionProps }) => (
            <MenuItem key={id} {...otherSectionProps} />
        ))}
    </div>
);

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);

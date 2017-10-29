import React from 'react';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { List as ImmutableList } from 'immutable';

import { PAGES } from '../../constants';

const AddButton = styled.span`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

export default function ClassesPage(props) {
  const {
    list,
  } = props;
  console.log(list);

  return (
    <div>
      <List>
        {list.map(item => (
          <ListItem
            key={item.get('id')}
            primaryText={item.get('title')}
          />
        ))}
      </List>

      {/* Floating btn */}
      <AddButton>
        <Link to={PAGES.EDIT_CLASSES}>
          <FloatingActionButton>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </AddButton>
    </div>
  );
}

ClassesPage.propTypes = {
  list: PropTypes.objectOf(ImmutableList),
};
ClassesPage.defaultProps = {
  list: [],
};

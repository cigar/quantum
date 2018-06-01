import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../Colors';
import Icon from '../Icon';
import Stamp from '../Stamp';
import options from './options';

const PADDING = '18px 24px';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const PopoverContainer = styled.div`
  border-radius: 8px;
  cursor: default;
  opacity: ${({ show }) => (show ? '1' : '0')};
  position: absolute;
  transition: opacity 0.2s ease-in-out;
  z-index: 100;

  &:after {
    content: '';
    position: absolute;
    ${({ place }) => options.arrowPosition(place)};
  }

  ${({ skin }) => (
    options.skins[skin]
      ? `
        border-color: ${options.skins[skin]};
        background-color: ${options.skins[skin]};
        color: ${Colors.WHITE};
      `
      : `
        border-color: ${Colors.WHITE};
        background-color: ${Colors.WHITE};
      `
  )}

  ${({ place }) => {
    if (place.indexOf('top') > -1) {
      return `box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.2),
              0 8px 14px 3px rgba(0, 0, 0, 0.12),
              0 8px 10px 1px rgba(0, 0, 0, 0.14);`;
    }

    if (place === 'right') {
      return `box-shadow: -3px 0 3px 0 rgba(0, 0, 0, 0.2),
              -6px 0 14px 3px rgba(0, 0, 0, 0.12),
              -6px 0 10px 1px rgba(0, 0, 0, 0.14);`;
    }

    return `box-shadow: 3px 0 3px 0 rgba(0, 0, 0, 0.2),
            6px 0 14px 3px rgba(0, 0, 0, 0.12),
            6px 0 10px 1px rgba(0, 0, 0, 0.14);`;
  }}

  ${options.popoverPosition}
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: ${({ title }) => (title ? 'space-between' : 'flex-end')};
  padding: ${PADDING};

  ${({ title }) => (title
    ? `border-bottom: 1px solid ${Colors.GREY['50']};`
    : 'padding-bottom: 0;'
  )};
`;

const Content = styled.div`
  padding: ${PADDING};

  ${({ stamp }) => stamp && 'padding-top: 30px;'}
`;

const CloseIcon = styled(Icon)`
  cursor: pointer;
`;

const ChildrenContainer = styled.div``;

class Popover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show,
      popoverMeasures: {
        width: null,
        height: null,
      },
      childrenMeasures: {
        width: null,
        height: null,
      },
    };
  }

  componentDidMount() {
    this.measure();
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.title !== nextProps.title ||
      this.props.content !== nextProps.content ||
      this.props.place !== nextProps.place ||
      this.props.show !== nextProps.show ||
      this.state.stamp !== nextState.stamp ||
      this.state.show !== nextState.show ||
      this.state.popoverMeasures.width !== nextState.popoverMeasures.width ||
      this.state.popoverMeasures.height !== nextState.popoverMeasures.height ||
      this.state.childrenMeasures.width !== nextState.childrenMeasures.width ||
      this.state.childrenMeasures.height !== nextState.childrenMeasures.height
    );
  }

  componentDidUpdate() {
    this.measure();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  measure() {
    const { clientWidth: popoverWidth, clientHeight: popoverHeight } = this.popoverRef;
    const { clientWidth: childrenWidth, clientHeight: childrenHeight } = this.childrenRef;

    this.setState({
      popoverMeasures: {
        width: popoverWidth,
        height: popoverHeight,
      },
      childrenMeasures: {
        width: childrenWidth,
        height: childrenHeight,
      },
    });
  }

  toggleVisibility = (event) => {
    event.preventDefault();

    const { show } = this.state;

    this.setState({ show: !show });
  }

  hide = () => {
    this.setState({ show: false });
  }

  handleClickOutside = ({ target }) => {
    if (!this.wrapperRef.contains(target)) this.hide();
  }

  render() {
    const {
      title, content, children, closeTitle, stamp, ...rest
    } = this.props;

    const {
      show,
      popoverMeasures: {
        width: popoverWidth,
        height: popoverHeight,
      },
      childrenMeasures: {
        width: childrenWidth,
        height: childrenHeight,
      },
    } = this.state;

    const measures = {
      popoverWidth, popoverHeight, childrenWidth, childrenHeight,
    };

    return (
      <Wrapper innerRef={(ref) => { this.wrapperRef = ref; }}>
        <PopoverContainer
          {...rest}
          {...measures}
          show={show}
          innerRef={(ref) => { this.popoverRef = ref; }}
        >
          {stamp && <Stamp text={stamp} />}

          <Header title={title}>
            { title && <span>{ title }</span> }
            <CloseIcon name="close" onClick={this.hide} title={closeTitle} />
          </Header>

          <Content stamp={stamp}>
            { content }
          </Content>
        </PopoverContainer>

        <ChildrenContainer
          onClick={this.toggleVisibility}
          innerRef={(ref) => { this.childrenRef = ref; }}
        >
          { children }
        </ChildrenContainer>
      </Wrapper>
    );
  }
}

Popover.propTypes = {
  children: PropTypes.node,
  closeTitle: PropTypes.string,
  content: PropTypes.node,
  place: PropTypes.oneOf([
    'top',
    'top-right',
    'top-left',
    'right',
    'left',
  ]),
  show: PropTypes.bool,
  skin: PropTypes.oneOf(['default', 'p2p']),
  stamp: PropTypes.string,
  title: PropTypes.string,
};

Popover.defaultProps = {
  children: '',
  closeTitle: '',
  content: '',
  place: 'top',
  show: false,
  skin: 'default',
  stamp: '',
  title: '',
};

export default Popover;

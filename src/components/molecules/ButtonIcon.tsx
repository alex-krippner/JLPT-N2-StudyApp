import React, { SyntheticEvent } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { IconButtonProps, SvgIcon } from '@material-ui/core';

interface ButtonIconProps {
  position?: 'absolute' | 'relative';
  top?: any;
  left?: any;
  zIndex?: number;
  color?: 'primary' | 'secondary';
  clickHandler?: (e?: SyntheticEvent) => void;
  Icon?: React.ComponentType | typeof SvgIcon;
  iconSize?: any;
}

const useStyles = makeStyles({
  root: {
    position: (props: ButtonIconProps) => props.position,
    top: (props: ButtonIconProps) => props.top,
    left: (props: ButtonIconProps) => props.left,
    zIndex: (props: ButtonIconProps) => props.zIndex,
  },

  icon: {
    fontSize: (props: ButtonIconProps) => props.iconSize,
  },
});

const ButtonIcon = (
  props: ButtonIconProps &
    Omit<IconButtonProps, keyof ButtonIconProps>,
) => {
  const classes = useStyles(props);
  const { clickHandler, color, Icon } = props;
  return (
    <IconButton
      className={classes.root}
      onClick={clickHandler}
      color={color}
    >
      <Icon className={classes.icon} />
    </IconButton>
  );
};

export default ButtonIcon;

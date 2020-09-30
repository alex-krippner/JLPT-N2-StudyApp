import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  logoMonoIcon: {
    fontSize: '7rem',
    position: (props) => `${props.position}`,
  },
}));

const LogoMonoIcon = (props) => {
  const classes = useStyles(props);

  const { color } = props;

  return (
    <SvgIcon
      viewBox="0 0 133.23 197.62"
      className={classes.logoMonoIcon}
    >
      <g transform="translate(-4.0738 -95.626)">
        <g
          transform="matrix(1.6603 0 0 1.6603 -55.065 -181.41)"
          stroke={color}
        >
          <g>
            <g fill="none" stroke={color} strokeWidth=".79681">
              <path d="m62.007 205.06c2.1397-14.015 6.3082-17.153 6.8561-24.882 0.82092-11.578 7.7939-14.726 15.327-12.002 12.562 4.5436 20.312 48.91 20.312 48.91s11.225 17.907 10.958 28.331c-0.26726 10.424-44.901 26.192-59.868 11.76-4.7651-4.5949-8.5594-0.60772-11.664-1.6181-6.6461-2.1632-9.4515-5.5608-7.0832-12.666 3.4745-10.424 11.263-13.779 14.471-18.056s10.424-11.225 10.691-19.778z" />
              <path d="m53.884 255.57s-9.5177 22.451 0.10401 24.322c9.6217 1.8709 16.303 2.6727 16.036-2.4054-0.26727-5.0781-1.5164-14.853-1.5164-14.853" />
              <path d="m95.056 259.44s9.3544 22.737-0.26727 24.608c-9.6217 1.8709-16.303 2.6727-16.036-2.4054 0.26727-5.0781 1.3274-18.992 1.3274-18.992" />
            </g>
            <g
              fill={color}
              fillOpacity=".95686"
              fillRule="evenodd"
              strokeWidth="0"
            >
              <ellipse
                cx="82.512"
                cy="172.6"
                rx=".36939"
                ry="1.3298"
                style={{ paintOrder: 'markers stroke fill' }}
              />
              <ellipse
                cx="80.261"
                cy="172.41"
                rx=".36939"
                ry="1.3298"
                style={{ paintOrder: 'markers stroke fill' }}
              />
              <ellipse
                transform="rotate(90)"
                cx="176.8"
                cy="-81.883"
                rx=".57368"
                ry="2.0652"
                style={{ paintOrder: 'markers stroke fill' }}
              />
            </g>
            <path
              d="m57.73 224.57c0.53454 4.009 0.86862 4.1427 1.8041 4.6104 0.93544 0.46772 2.4722 1.5368 2.7395 2.4722 0.26727 0.93545 0.20045 2.4054 1.2695 1.9377 1.0691-0.46773 1.6036-0.53454 0.73499-1.4032-0.86863-0.86862-0.73499-4.744-0.73499-4.744"
              fill="none"
              stroke={color}
              strokeWidth=".79681"
            />
            <path
              d="m103.45 229.86c-0.53454 4.009-0.86863 4.1427-1.8041 4.6104-0.93545 0.46772-2.4722 1.5368-2.7395 2.4722-0.26727 0.93545-0.20045 2.4054-1.2695 1.9377-1.0691-0.46773-1.6036-0.53454-0.73499-1.4032 0.86862-0.86862 0.73499-4.744 0.73499-4.744"
              fill="none"
              stroke={color}
              strokeWidth=".79681"
            />
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};

export default LogoMonoIcon;

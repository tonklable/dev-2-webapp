import React from 'react';
import PropTypes from 'prop-types';
import Mark from './Mark';
import { formatHour as defaultFormatHour } from './shared/hourFormatter';
type HourMarkProps = React.ComponentProps<typeof Mark> & {
    formatHour?: typeof defaultFormatHour;
    locale?: string;
    number?: number;
};
declare function HourMark({ formatHour, locale, number, ...otherProps }: HourMarkProps): JSX.Element;
declare namespace HourMark {
    var propTypes: {
        formatHour: PropTypes.Requireable<(...args: any[]) => any>;
        locale: PropTypes.Requireable<string>;
        number: PropTypes.Requireable<number>;
    };
}
export default HourMark;

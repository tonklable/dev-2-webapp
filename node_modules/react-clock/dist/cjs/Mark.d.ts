import React from 'react';
import PropTypes from 'prop-types';
import type { MarkLength, MarkWidth } from './shared/types';
type MarkProps = {
    angle?: number;
    length?: MarkLength;
    name: string;
    number?: React.ReactNode;
    width?: MarkWidth;
};
declare function Mark({ angle, length, name, width, number }: MarkProps): JSX.Element;
declare namespace Mark {
    var propTypes: {
        angle: PropTypes.Requireable<number>;
        length: (props: Record<string, unknown>, propName: string, componentName: string) => Error | null;
        name: PropTypes.Validator<string>;
        number: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        width: typeof import("./shared/propTypes").isHandWidth;
    };
}
export default Mark;

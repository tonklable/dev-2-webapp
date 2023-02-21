/// <reference types="react" />
import PropTypes from 'prop-types';
import { isHandWidth } from './shared/propTypes';
import type { HandLength, HandWidth, OppositeHandLength } from './shared/types';
type HandProps = {
    angle?: number;
    length?: HandLength;
    name: string;
    oppositeLength?: OppositeHandLength;
    width?: HandWidth;
};
declare function Hand({ angle, name, length, oppositeLength, width, }: HandProps): JSX.Element;
declare namespace Hand {
    var propTypes: {
        angle: PropTypes.Requireable<number>;
        length: (props: Record<string, unknown>, propName: string, componentName: string) => Error | null;
        name: PropTypes.Validator<string>;
        oppositeLength: (props: Record<string, unknown>, propName: string, componentName: string) => Error | null;
        width: typeof isHandWidth;
    };
}
export default Hand;

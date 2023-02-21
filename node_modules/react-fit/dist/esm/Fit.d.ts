import React, { Component } from 'react';
import PropTypes from 'prop-types';
type SpacingKeys = 'bottom' | 'left' | 'right' | 'top';
type Spacing = number | {
    [key in SpacingKeys]: number;
};
type FitProps = {
    children: React.ReactNode;
    invertAxis?: boolean;
    invertSecondaryAxis?: boolean;
    mainAxis: 'x' | 'y';
    spacing?: number | Spacing;
};
export default class Fit extends Component<FitProps> {
    static propTypes: {
        children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        invertAxis: PropTypes.Requireable<boolean>;
        invertSecondaryAxis: PropTypes.Requireable<boolean>;
        mainAxis: PropTypes.Requireable<string>;
        spacing: PropTypes.Requireable<NonNullable<number | PropTypes.InferProps<{
            bottom: PropTypes.Validator<number>;
            left: PropTypes.Validator<number>;
            right: PropTypes.Validator<number>;
            top: PropTypes.Validator<number>;
        }> | null | undefined>>;
    };
    componentDidMount(): void;
    container?: HTMLElement | null;
    element?: HTMLElement | null;
    elementWidth?: number;
    elementHeight?: number;
    scrollContainer?: HTMLElement;
    fit: () => void;
    render(): string | number | boolean | React.ReactFragment | JSX.Element | null | undefined;
}
export {};

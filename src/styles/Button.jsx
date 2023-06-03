import styled from 'styled-components';

// only a reusable component would get a styled file for its own
export const Button = styled.button`
    border-radius: var(--border-radius);
    border: 1px solid var(--base-boder);
    padding: 0.6em var(--base-padding);
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: inherit;
    transition: border-color ease-in-out 0.2s
    cursor: pointer;
    color: var(--button-text);
    &:hover {
        border-color: var(--border-hover);
    }
    &.active {
        background-color: var(--active-background);
        color: var(--active-text);
    }

    &.iconButton {
        display: flex;
        flex-direction: row;
        margin: 0.5em 0.5em 0;
        svg {
            width: 20px;
            height: 20px;
            fill: var(--icon);
        }
        span {
            opacity: 0;
            position: absolute;
            padding: var(--base-padding);
            font-size: 10px;
            background-color: var(--base-background);
            border: inherit;
            border-radius: var(--border-radius);
            transition: opacity ease-in-out 0.2s
        }
        &:hover {
            span {
                opacity: 1;
            }
        }
        &:first-child {
            margin-left: auto;
        }
        &:last-child {
            margin-right: auto;
        }
        &.active {
            background-color: var(--active-background);
            color: var(--active-text);
            svg {
                fill: var(--active-icon);
            }
        }
    }
`;
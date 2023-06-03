import styled from 'styled-components';

// only a reusable component would get a styled file for its own
export const Thumbnail = styled.div`
    display: flex;
    justify-content: center;
    overflow: hidden;
    height: 80px;
    aspect-ratio: 4/3;
    border: 1px solid var(--border-hover);
    border-radius: var(--border-radius);
    padding: var(--base-padding);
    margin: 0.6em 1.2em;
    background-color: inherit;
    scale: 1;
    cursor: pointer;
    transition: scale 0.2s;
    z-index: 2;
    &:last-child {
        margin-right: auto;
    }
    &:focus, &:hover {
        scale: 1.1;
    }
    img {
        display: flex;
        height: 100%;
        background-size: cover;
        border-radius: var(--border-radius);
    }
`;
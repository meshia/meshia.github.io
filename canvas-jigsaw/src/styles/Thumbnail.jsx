import styled from 'styled-components';

// only a reusable component would get a styled file for its own
export const Thumbnail = styled.div`
    display: flex;
    height: 80px;
    aspect-ratio: 4/3;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em;
    margin: 0.6em 1.2em;
    background-color: inherit;
    border-color: var(--border-hover);
    scale: 1;
    transition: scale 0.2s;
    cursor: pointer;
    z-index: 2;
    &:last-child {
        margin-right: auto;
    }
    &:focus, &:hover {
        scale: 1.1;
    }
    img {
        width: 100%;
        height: 100%;
        image-size: cover;
    }
`;
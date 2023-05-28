import styled from 'styled-components';

// only a reusable component would get a styled file for its own
export const Thumbnail = styled.div`
    display: flex;
    height: 80px;
    aspect-ratio: 4/3;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    margin: 0.6em 1.2em;
    background-color: inherit;
    border-color: var(--base-boder);
    transition: border-color 0.2s;
    cursor: pointer;
    &:last-child {
        margin-right: auto;
    }
    &:hover {
        border-color: var(--border-hover);
    }
    img {
        width: 100%;
        height: 100%;
        image-size: cover;
    }
`;
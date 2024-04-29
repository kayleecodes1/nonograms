import styled from 'styled-components';

export const ToggleContainer = styled.div({
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    width: 'fit-content',
    background: '#F0F3F8',
    padding: 4,
    borderRadius: 18,
});

export const ToggleButton = styled.button<{ active?: boolean }>(
    ({ active = false }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 16,
        border: 0,
        cursor: 'pointer',
        ...(active
            ? {
                  color: '#344861',
                  background: '#FFF',
              }
            : {
                  color: '#808d9e',
                  background: 'transparent',
              }),
    })
);

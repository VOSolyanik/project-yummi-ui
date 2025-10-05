import { useContext } from 'react';

import { ViewportContext } from '../contexts/ViewportContext.jsx';

export const useViewport = () => useContext(ViewportContext);
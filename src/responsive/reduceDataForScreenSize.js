import {Breakpoint} from '../hooks/useBreakpoint';


export function reduceDataForScreenSize(
    data, breakpoint, smallBreakpointIndices, mediumBreakpointIndices
) {
    switch (breakpoint) {
        case Breakpoint.SMALL:
            // Return only data in the smallBreakpointIndices
            return data.filter((_, i) => smallBreakpointIndices.indexOf(i) !== -1);
        case Breakpoint.MEDIUM:
            // Return only data in the mediumBreakpointIndices
            return data.filter((_, i) => mediumBreakpointIndices.indexOf(i) !== -1);
        default:
            // Don't filter the data at all
            return data;
    }
}
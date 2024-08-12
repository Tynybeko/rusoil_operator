import { InitialObjectType } from "../types";

export const returnPaginationRange = (totalPage: number, page: number, limit: number, siblings: number) => {
    const range = (start: number, end: number) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    let totalPageNoInArray = 7 + siblings;
    if (totalPageNoInArray >= totalPage) {
        return range(1, totalPage + 1);
    }
    let leftSiblingsIndex = Math.max(page - siblings, 1);
    let rightSiblingsIndex = Math.min(page + siblings, totalPage);

    let showLeftDots = leftSiblingsIndex > 2;
    let showRightDots = rightSiblingsIndex < totalPage - 2;

    if (!showLeftDots && showRightDots) {
        let leftItemsCount = 3 + 2 * siblings;
        let leftRange = range(1, leftItemsCount + 1);
        return [...leftRange, "...", totalPage];
    } else if (showLeftDots && !showRightDots) {
        let rightItemsCount = 3 + 2 * siblings;
        let rightRange = range(totalPage - rightItemsCount + 1, totalPage + 1);
        return [1, "...", ...rightRange];
    } else {
        let middleRange = range(leftSiblingsIndex, rightSiblingsIndex + 1);
        return [1, "...", ...middleRange, "...", totalPage];
    }
}

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleString('ru-RU', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+)/, '$3-$1-$2 $4:$5')}`;
};


import {useMemo} from "react";

// используя useMemo Сделать так чтобы этот массив не пересчитывался на каждом рендере
// а пересчитывался только тогда когда изменилось общее кол-во страниц
export const usePagesArray = (totalPages) => {

    const memoizedPagesArray = useMemo(() => {
        let result = []
        for (let i = 0; i < totalPages; i++) {
            result.push(i + 1)
        }
        // console.log("Пересчитывание массива " + totalPages )
        return result;
    }, [totalPages])

    return memoizedPagesArray;
}
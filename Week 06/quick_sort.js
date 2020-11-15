function quick_sort(arr, start, end) {
  if (start < end) {
    let x = arr[start];
    let i = start,
      j = end;
    while (i < j) {
      while (i < j && arr[j] >= x) {
        j--;
      }
      if (i < j) {
        arr[i++] = arr[j];
      }
      while (i < j && arr[i] <= x) {
        i++;
      }
      if (i < j) {
        arr[j--] = arr[i];
      }
    }
    arr[i] = x;
    quick_sort(arr, start, i - 1);
    quick_sort(arr, i + 1, end);
  }
  return arr;
}
let arr = [78, 34, 25, 34, 30, 87, 98, 20, 4, 100, 3, 101];
console.log(quick_sort(arr, 0, arr.length - 1));


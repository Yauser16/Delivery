
import { CSVLink } from "react-csv";

const useDeliveryServices = () => {

    const today = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
        return `${day}.${month}.${year}`;
    };

    const selectData = () => {
        const arrDates = [];
        let todays = new Date();
        let date = new Date(todays.getFullYear(), todays.getMonth(), todays.getDate());
        for (let i = 0; i < 20; i++) {
            let d = i === 0 ? 0 : 1;
            date.setDate(date.getDate() + d);
            let year = date.getFullYear();
            let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
            let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
            // console.log(days + 23);
            let dateNext = `${day}.${month}.${year}`;
            arrDates.push(dateNext);
        }
        return arrDates.map(item => {
            return <option key={item} value={item}>{item}</option>
        })
    }

    const selectWeight = () => {
        const arr = [];
        let i = 0;
        for (let e = 1; e <= 20; e++) {
            i = +e;
            arr.push(i);
        }

        return arr.map(item => {
            return <option key={item} value={item}>{item}</option>
        })
    }

    const checkDate = item => {
        let dateRegex = /(\d\d).(\d\d).(\d\d\d\d)/;
        let itemDateArr = dateRegex.exec(item);
        let todayDateArr = dateRegex.exec(today());
        let itemDate = new Date(itemDateArr[3], itemDateArr[2], itemDateArr[1]);
        let todayDate = new Date(todayDateArr[3], todayDateArr[2], todayDateArr[1]);
        if (new Date(itemDate) >= new Date(todayDate)) {
            return true;
        } return false;
    }

    const exportCSV = (csvData, fileName, title) => {
        const headers = [
            { label: "Площадка", key: "place" },
            { label: "Операция", key: "operation" },
            { label: "Контрагент", key: "name" },
            { label: "Номер машины", key: "contactName" },
            { label: "Телефон водителя", key: "phone" },
            { label: "Дата доставки", key: "date" },
            { label: "Груз", key: "goods" },
            { label: "Вес", key: "weight" },
            { label: "Количество мест", key: "items" },
            { label: "Время операции", key: "documents" },
            { label: "Детали", key: "description" },
            { label: "Заявитель", key: "sender" },
            { label: "Статус", key: "driver" }
        ];
        return <CSVLink className="dropdown-item" role="button" data={csvData} headers={headers} separator={"\t"} filename={fileName}>{title}</CSVLink>
    };

    return {
        today,
        selectData,
        selectWeight,
        checkDate,
        exportCSV
    }

}
export default useDeliveryServices;
import React from "react";
import "./App.css";
import Input from "./Components/Input";
import "./styles.css";
import * as moment from "moment";
import { ChartBar } from "./Components/ChartBar";
import ExpenseCard from "./Components/ExpenseCard";
interface expense {
    amount: number;
    title: string;
    date: moment.Moment;
}

function App() {
    const testValues = [
        {
            amount: 1200,
            title: "Groceries",
            date: moment().subtract(2, "days"),
        },
        {
            amount: 3000,
            title: "Bar",
            date: moment().subtract(6, "days"),
        },
        {
            amount: 10000,
            title: "Rent",
            date: moment().subtract(1, "year"),
        },
        {
            amount: 15000,
            title: "Rent",
            date: moment().subtract(1, "year").subtract(3, "months"),
        },
    ];
    const [items, setItems] = React.useState<expense[]>(testValues);
    const [years, setYears] = React.useState<number[]>([]);
    const [selectedYear, setSelectedYear] = React.useState<number | string>(
        "all"
    );
    const [yearExpenses, setYearExpenses] = React.useState<
        { total: number; percentage: number }[]
    >([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            amount: Number(e.target.amount.value),
            title: e.target.title.value,
            date: moment(e.target.date.value),
        };
        e.target.title.value = "";
        e.target.date.value = "";
        e.target.amount.value = "";
        e.target.title.focus();
        setItems((prev) => [...prev, newItem]);
    };

    const getYears = (expenses: expense[]) => {
        const years = new Set<number>();
        expenses.forEach((item: expense) => {
            years.add(item.date.year());
        });
        return Array.from(years);
    };

    const calculateChart = React.useCallback((items, selectedYear) => {
        let expensesPerMonth = calculateExpensesPerMonth(items, selectedYear);
        const totalYear = expensesPerMonth.reduce(
            (total, currentValue) => total + currentValue,
            0
        );
        expensesPerMonth = expensesPerMonth.map((exp) => ({
            total: exp,
            percentage: (exp * 100) / totalYear,
        }));
        setYearExpenses(expensesPerMonth);
    }, []);

    React.useEffect(() => {
        setYears(getYears(items));
        calculateChart(items, selectedYear);
    }, [items, calculateChart, selectedYear]);

    const handleSelectYear = (e) => {
        setSelectedYear(e.target.value);
    };

    const calculateExpensesPerMonth = (items, year) => {
        let months = [...Array(12).fill(0)];
        console.log("YEAR", year);

        const filteredExpenses =
            year === "all"
                ? items
                : items.filter((exp) => exp.date.year() === Number(year));
        filteredExpenses.forEach((exp: expense) => {
            const month = exp.date.month() - 1;
            months[month] += exp.amount;
        });
        return months;
    };

    return (
        <div className="App">
            <h1>Expense Tracker</h1>
            <section className="form__wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="form__inputs_wrapper">
                        <Input id="title" label="Title" />
                        <Input id="amount" label="Amount" type="number" />
                        <Input id="date" label="Date" type="date" />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </section>
            <section>
                <p>{selectedYear}</p>

                <section className="chart__wrapper">
                    {yearExpenses.map((month, i) => (
                        <ChartBar
                            {...month}
                            month={moment.months(i).slice(0, 3)}
                        />
                    ))}
                </section>
            </section>
            <section className="list__wrapper">
                <select onChange={handleSelectYear}>
                    <option value="all">All</option>
                    {years.map((year) => (
                        <option value={year}>{year}</option>
                    ))}
                </select>
                <div className="expenses__list"></div>
                {items.map((item: expense) => (
                    <ExpenseCard {...item} />
                ))}
            </section>
        </div>
    );
}

export default App;

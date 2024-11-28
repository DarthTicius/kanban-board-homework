import { Board } from "@src/components/Board";
import { Footer } from "@src/components/Footer";
import { Header } from "@src/components/Header";
import { BoardProp } from "@src/data/boardEntries";
import "@style/app.scss";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
export function Layout() {

type Props = {
	children: React.ReactNode;
};
export function Layout({ children }: Props) {

	return (
		<div className="max-w-screen-2xl mx-auto">
			<Header />
			<Board boards={boards} setBoards={setBoards} />
			{children}
			<Footer />
		</div>
	)
}

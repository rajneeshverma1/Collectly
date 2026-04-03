"use client";

import React, { useState } from "react";
import { X, ChevronLeft, Menu, Navigation2, Clock, TrendingUp } from "lucide-react";
import type { ScoredRouteInfo } from "@/types/route";

interface GoogleMapsLayoutProps {
	children: React.ReactNode;
	searchBar: React.ReactNode;
	routes: ScoredRouteInfo[];
	selectedIndex: number;
	onSelectRoute: (index: number) => void;
	showRoutes: boolean;
	constructionZonesAvoided?: string[];
	filteredCount?: number;
}

const GoogleMapsLayout: React.FC<GoogleMapsLayoutProps> = ({
	children,
	searchBar,
	routes,
	selectedIndex,
	onSelectRoute,
	showRoutes,
	constructionZonesAvoided = [],
	filteredCount = 0,
}) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [isMobileRoutesOpen, setIsMobileRoutesOpen] = useState(false);

	return (
		<div className="relative w-full h-screen overflow-hidden">
			{/* Map Container - Full Screen */}
			<div className="absolute inset-0">
				{children}
			</div>

			{/* Desktop Sidebar - Left Side */}
			<div
				className={`hidden md:flex absolute top-0 left-0 bottom-0 bg-white dark:bg-gray-900 shadow-2xl transition-all duration-300 ease-in-out z-40 ${
					isSidebarOpen ? "w-[400px]" : "w-0"
				} overflow-hidden`}>
				<div className="w-[400px] flex flex-col h-full">
					{/* Header */}
					<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
						<h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
							Vayu Navigation
						</h1>
						<button
							onClick={() => setIsSidebarOpen(false)}
							className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
							<ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
						</button>
					</div>

					{/* Search Bar */}
					<div className="p-4 border-b border-gray-200 dark:border-gray-800">
						{searchBar}
					</div>

					{/* Routes List */}
					{showRoutes && routes.length > 0 && (
						<div className="flex-1 overflow-y-auto">
							<div className="p-4">
								{/* Construction Zone Warning */}
								{constructionZonesAvoided.length > 0 && (
									<div className="mb-4 p-3 bg-orange-50 dark:bg-orange-950 border-2 border-orange-300 dark:border-orange-700 rounded-lg">
										<div className="flex items-start gap-2">
											<span className="text-lg">⚠️</span>
											<div className="flex-1">
												<div className="font-semibold text-sm text-orange-800 dark:text-orange-200 mb-1">
													Construction Zones Avoided
												</div>
												<div className="text-xs text-orange-700 dark:text-orange-300">
													{filteredCount} route{filteredCount > 1 ? 's' : ''} filtered due to:
												</div>
												<ul className="text-xs text-orange-700 dark:text-orange-300 mt-1 ml-4 list-disc">
													{constructionZonesAvoided.map((zone, idx) => (
														<li key={idx}>{zone}</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								)}
								
								<h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
									<Navigation2 className="w-4 h-4" />
									{routes.length} Route{routes.length > 1 ? "s" : ""} Found
								</h2>
								<div className="space-y-2">
									{routes.map((route, idx) => (
										<RouteCard
											key={route.index}
											route={route}
											isSelected={idx === selectedIndex}
											onSelect={() => onSelectRoute(idx)}
											index={idx}
										/>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Empty State */}
					{!showRoutes && (
						<div className="flex-1 flex items-center justify-center p-8">
							<div className="text-center">
								<Navigation2 className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Enter a destination to see routes
								</p>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Desktop Toggle Button (when sidebar closed) */}
			{!isSidebarOpen && (
				<button
					onClick={() => setIsSidebarOpen(true)}
					className="hidden md:flex absolute top-4 left-4 z-40 p-3 bg-white dark:bg-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all">
					<Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
				</button>
			)}

			{/* Mobile Search Bar - Top */}
			<div className="md:hidden absolute top-0 left-0 right-0 z-40 p-3">
				{searchBar}
			</div>

			{/* Mobile Routes Dropdown - Bottom */}
			{showRoutes && routes.length > 0 && (
				<div className="md:hidden absolute bottom-0 left-0 right-0 z-40">
					{/* Collapsed View - Red Drip Style */}
					{!isMobileRoutesOpen && (
						<button
							onClick={() => setIsMobileRoutesOpen(true)}
							className="w-full bg-gradient-to-b from-red-500 to-red-600 text-white p-4 shadow-2xl"
							style={{
								borderTopLeftRadius: "24px",
								borderTopRightRadius: "24px",
							}}>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="p-2 bg-white/20 rounded-lg">
										<Navigation2 className="w-5 h-5" />
									</div>
									<div className="text-left">
										<div className="text-sm font-bold">
											{routes.length} Route{routes.length > 1 ? "s" : ""} Available
										</div>
										<div className="text-xs opacity-90">
											Best: {routes[0].durationMin.toFixed(0)} min • PM2.5: {routes[0].avgPm25.toFixed(1)}
										</div>
									</div>
								</div>
								<TrendingUp className="w-5 h-5 rotate-180" />
							</div>
						</button>
					)}

					{/* Expanded View - Full Routes List */}
					{isMobileRoutesOpen && (
						<div
							className="bg-white dark:bg-gray-900 shadow-2xl animate-in slide-in-from-bottom duration-300"
							style={{
								borderTopLeftRadius: "24px",
								borderTopRightRadius: "24px",
								maxHeight: "70vh",
							}}>
							{/* Header */}
							<div className="sticky top-0 bg-gradient-to-b from-red-500 to-red-600 text-white p-4 flex items-center justify-between"
								style={{
									borderTopLeftRadius: "24px",
									borderTopRightRadius: "24px",
								}}>
								<div className="flex items-center gap-2">
									<Navigation2 className="w-5 h-5" />
									<span className="font-bold">Select Your Route</span>
								</div>
								<button
									onClick={() => setIsMobileRoutesOpen(false)}
									className="p-1.5 hover:bg-white/20 rounded-full transition-colors">
									<X className="w-5 h-5" />
								</button>
							</div>

							{/* Routes List */}
							<div className="overflow-y-auto p-3 space-y-2" style={{ maxHeight: "calc(70vh - 64px)" }}>
								{routes.map((route, idx) => (
									<RouteCard
										key={route.index}
										route={route}
										isSelected={idx === selectedIndex}
										onSelect={() => {
											onSelectRoute(idx);
											setIsMobileRoutesOpen(false);
										}}
										index={idx}
										isMobile
									/>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

// Route Card Component
interface RouteCardProps {
	route: ScoredRouteInfo;
	isSelected: boolean;
	onSelect: () => void;
	index: number;
	isMobile?: boolean;
}

const RouteCard: React.FC<RouteCardProps> = ({
	route,
	isSelected,
	onSelect,
	index,
	isMobile = false,
}) => {
	const getAQIColor = (pm25: number) => {
		if (pm25 <= 12) return "text-green-700 bg-green-100 dark:bg-green-950 border-green-300";
		if (pm25 <= 35.4) return "text-yellow-700 bg-yellow-100 dark:bg-yellow-950 border-yellow-300";
		if (pm25 <= 55.4) return "text-orange-600 bg-orange-100 dark:bg-orange-950 border-orange-300";
		if (pm25 <= 150.4) return "text-red-600 bg-red-100 dark:bg-red-950 border-red-300";
		if (pm25 <= 250.4) return "text-purple-600 bg-purple-100 dark:bg-purple-950 border-purple-300";
		return "text-rose-700 bg-rose-100 dark:bg-rose-950 border-rose-300";
	};

	const getAQILabel = (pm25: number) => {
		if (pm25 <= 12) return "Good";
		if (pm25 <= 35.4) return "Moderate";
		if (pm25 <= 55.4) return "Unhealthy (Sensitive)";
		if (pm25 <= 150.4) return "Unhealthy";
		if (pm25 <= 250.4) return "Very Unhealthy";
		return "Hazardous";
	};

	const handleGoogleMapsClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (route.googleMapsUrl) {
			window.open(route.googleMapsUrl, '_blank', 'noopener,noreferrer');
		}
	};

	return (
		<div
			className={`w-full text-left rounded-xl transition-all ${
				isSelected
					? "bg-blue-50 dark:bg-blue-950 border-2 border-blue-500 shadow-lg"
					: "bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700"
			} ${isMobile ? "p-4" : "p-3"}`}>
			<button
				onClick={onSelect}
				className="w-full text-left">
				{/* Header */}
				<div className="flex items-start justify-between mb-2">
					<div className="flex items-center gap-2">
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
								route.isBest
									? "bg-green-500 text-white"
									: "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
							}`}>
							{index + 1}
						</div>
						<div>
							<div className="font-semibold text-sm text-gray-900 dark:text-gray-100">
								{route.isBest ? "Best Route" : `Route ${index + 1}`}
							</div>
							{route.isBest && route.avgPm25 <= 55.4 && (
								<div className="text-xs text-green-600 dark:text-green-400 font-medium">
									Cleanest Air
								</div>
							)}
							{route.hasConstructionWarning && (
								<div className="text-xs text-orange-600 dark:text-orange-400 font-medium flex items-center gap-1 mt-0.5">
									⚠️ Construction Zone
								</div>
							)}
						</div>
					</div>
					<div className={`px-2 py-1 rounded-full text-xs font-bold border ${getAQIColor(route.avgPm25)}`}>
						{getAQILabel(route.avgPm25)}
					</div>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-3 gap-2 mb-3">
					<div className="text-center p-2 bg-white dark:bg-gray-900 rounded-lg">
						<div className="flex items-center justify-center gap-1 mb-1">
							<Clock className="w-3 h-3 text-gray-400" />
						</div>
						<div className="text-lg font-bold text-gray-900 dark:text-gray-100">
							{route.durationMin.toFixed(0)}
						</div>
						<div className="text-xs text-gray-500">min</div>
					</div>
					<div className="text-center p-2 bg-white dark:bg-gray-900 rounded-lg">
						<div className="flex items-center justify-center gap-1 mb-1">
							<Navigation2 className="w-3 h-3 text-gray-400" />
						</div>
						<div className="text-lg font-bold text-gray-900 dark:text-gray-100">
							{route.distanceKm.toFixed(1)}
						</div>
						<div className="text-xs text-gray-500">km</div>
					</div>
					<div className="text-center p-2 bg-white dark:bg-gray-900 rounded-lg">
						<div className="flex items-center justify-center gap-1 mb-1">
							<div className="w-3 h-3 rounded-full bg-gray-400" />
						</div>
						<div className="text-lg font-bold text-gray-900 dark:text-gray-100">
							{route.avgPm25.toFixed(1)}
						</div>
						<div className="text-xs text-gray-500">PM2.5</div>
					</div>
				</div>

				{/* Via Info */}
				<div className="text-xs text-gray-500 dark:text-gray-400 text-center">
					Via fastest route • {route.distanceKm.toFixed(1)} km
				</div>
			</button>

			{/* Google Maps Button - Outside the route selection button */}
			{route.googleMapsUrl && (
				<button
					onClick={handleGoogleMapsClick}
					className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg transition-all mt-2 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md group">
					{/* Google Maps Icon - Multicolor */}
					<svg 
						className="w-5 h-5" 
						viewBox="0 0 24 24" 
						fill="none">
						<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
						<circle cx="12" cy="9" r="2.5" fill="#FFFFFF"/>
						<path d="M12 6.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" fill="#4285F4"/>
					</svg>
					<span className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">
						Open in Google Maps
					</span>
					<svg 
						className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-700" 
						fill="none" 
						stroke="currentColor" 
						viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
					</svg>
				</button>
			)}
		</div>
	);
};

export default GoogleMapsLayout;

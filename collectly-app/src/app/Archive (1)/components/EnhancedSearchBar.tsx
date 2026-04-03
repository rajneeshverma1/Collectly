"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGeocoder } from "@/hooks/useGeocoder";
import { getCoordinatesForQuery } from "@/services/geocodingService";
import type { Coordinates, GeocodingResult } from "@/types/location";
import { 
	MapPin, 
	Navigation, 
	X, 
	Clock, 
	Star,
	Search,
	Loader2,
	TrendingUp
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface EnhancedSearchBarProps {
	onStartChange: (coords: Coordinates) => void;
	onDestinationChange: (coords: Coordinates) => void;
	onResetGPS: () => void;
	isManualStart: boolean;
	userLocation: Coordinates | null;
}

type ActiveField = "start" | "destination" | null;

const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({
	onStartChange,
	onDestinationChange,
	onResetGPS,
	isManualStart,
	userLocation,
}) => {
	const [startInput, setStartInput] = useState("");
	const [destInput, setDestInput] = useState("");
	const [activeField, setActiveField] = useState<ActiveField>(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const startInputRef = useRef<HTMLInputElement>(null);
	const destInputRef = useRef<HTMLInputElement>(null);

	const { results, isSearching, search, clear } = useGeocoder(userLocation);

	// Recent searches (mock data - can be stored in localStorage)
	const recentSearches = [
		{ name: "Polytechnic Chauraha", type: "recent" },
		{ name: "Hazratganj", type: "recent" },
	];

	const handleSelect = (result: GeocodingResult) => {
		const selectedLabel = result.displayLabel || result.placeName || result.text;
		if (activeField === "start") {
			setStartInput(selectedLabel);
			onStartChange(result.center);
			// Auto-focus destination after selecting start
			setTimeout(() => destInputRef.current?.focus(), 100);
		} else if (activeField === "destination") {
			setDestInput(selectedLabel);
			onDestinationChange(result.center);
		}
		clear();
	};

	const handleStartSearch = async () => {
		if (!startInput.trim()) return;
		const coords = await getCoordinatesForQuery(startInput, userLocation ?? undefined);
		if (coords) {
			onStartChange(coords);
			destInputRef.current?.focus();
		}
		clear();
	};

	const handleDestSearch = async () => {
		if (!destInput.trim()) return;
		const coords = await getCoordinatesForQuery(destInput, userLocation ?? undefined);
		if (coords) onDestinationChange(coords);
		clear();
		setActiveField(null);
		setIsExpanded(false);
	};

	const handleStartInputChange = (value: string) => {
		setStartInput(value);
		setActiveField("start");
		setIsExpanded(true);
		if (value === "") {
			onResetGPS();
			clear();
		} else {
			search(value);
		}
	};

	const handleDestInputChange = (value: string) => {
		setDestInput(value);
		setActiveField("destination");
		setIsExpanded(true);
		if (value === "") {
			clear();
		} else {
			search(value);
		}
	};

	const clearStart = () => {
		setStartInput("");
		onResetGPS();
		clear();
		startInputRef.current?.focus();
	};

	const clearDest = () => {
		setDestInput("");
		clear();
		destInputRef.current?.focus();
	};

	const swapLocations = () => {
		const temp = startInput;
		setStartInput(destInput);
		setDestInput(temp);
		// Swap coordinates logic would go here
	};

	return (
		<div className="absolute top-4 left-4 right-4 md:left-6 md:right-auto md:w-[420px] z-30">
			<div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 transition-all duration-300 ${isExpanded ? 'shadow-3xl' : ''}`}>
				{/* Search Container */}
				<div className="p-4 space-y-3">
					{/* Start Location */}
					<div className="relative group">
						<div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
							<div className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
						</div>
						<Input
							ref={startInputRef}
							className="h-12 pl-11 pr-10 text-base bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:bg-white dark:focus-visible:bg-gray-900 transition-all"
							placeholder={isManualStart ? "Choose starting point" : "Your location"}
							value={startInput}
							onChange={(e) => handleStartInputChange(e.target.value)}
							onFocus={() => {
								setActiveField("start");
								setIsExpanded(true);
							}}
							onKeyDown={(e) => e.key === "Enter" && handleStartSearch()}
						/>
						{startInput && (
							<button
								onClick={clearStart}
								className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
								<X className="w-4 h-4 text-gray-400" />
							</button>
						)}
					</div>

					{/* Swap Button */}
					<div className="flex justify-center -my-1">
						<button
							onClick={swapLocations}
							className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
							title="Swap locations">
							<TrendingUp className="w-4 h-4 text-gray-400 rotate-90" />
						</button>
					</div>

					{/* Destination */}
					<div className="relative group">
						<div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
							<div className="w-2.5 h-2.5 rounded-full bg-red-500 ring-4 ring-red-500/20" />
						</div>
						<Input
							ref={destInputRef}
							className="h-12 pl-11 pr-10 text-base bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:bg-white dark:focus-visible:bg-gray-900 transition-all"
							placeholder="Choose destination"
							value={destInput}
							onChange={(e) => handleDestInputChange(e.target.value)}
							onFocus={() => {
								setActiveField("destination");
								setIsExpanded(true);
							}}
							onKeyDown={(e) => e.key === "Enter" && handleDestSearch()}
						/>
						{destInput && (
							<button
								onClick={clearDest}
								className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
								<X className="w-4 h-4 text-gray-400" />
							</button>
						)}
					</div>

					{/* Action Buttons */}
					<div className="flex gap-2 pt-1">
						<Button
							onClick={() => {
								clearStart();
								onResetGPS();
							}}
							variant="outline"
							size="sm"
							className="flex-1 h-9 text-sm border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-800 transition-all">
							<MapPin className="w-4 h-4 mr-1.5" />
							Current Location
						</Button>
						<Button
							onClick={handleDestSearch}
							disabled={!destInput.trim()}
							className="flex-1 h-9 text-sm bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
							<Navigation className="w-4 h-4 mr-1.5 fill-current" />
							Search
						</Button>
					</div>
				</div>

				{/* Suggestions Dropdown */}
				{isExpanded && activeField && (
					<div className="border-t border-gray-100 dark:border-gray-800 max-h-[400px] overflow-y-auto">
						{/* Loading State */}
						{isSearching && (
							<div className="px-4 py-8 text-center">
								<Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400 mb-2" />
								<p className="text-sm text-gray-500">Searching locations...</p>
							</div>
						)}

						{/* Search Results */}
						{!isSearching && results.length > 0 && (
							<div className="py-2">
								<div className="px-4 py-2">
									<p className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
										<Search className="w-3.5 h-3.5" />
										Search Results
									</p>
								</div>
								{results.map((result, index) => (
									<button
										key={index}
										onClick={() => handleSelect(result)}
										className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-start gap-3 group">
										<div className="mt-0.5 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-950 transition-colors">
											<MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
										</div>
										<div className="flex-1 min-w-0">
											<div className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
												{result.text}
											</div>
											{result.secondaryText && (
												<div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
													{result.secondaryText}
												</div>
											)}
										</div>
									</button>
								))}
							</div>
						)}

						{/* Recent Searches (when no active search) */}
						{!isSearching && results.length === 0 && (startInput === "" || destInput === "") && (
							<div className="py-2">
								<div className="px-4 py-2">
									<p className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
										<Clock className="w-3.5 h-3.5" />
										Recent
									</p>
								</div>
								{recentSearches.map((item, index) => (
									<button
										key={index}
										onClick={() => {
											if (activeField === "start") {
												setStartInput(item.name);
											} else {
												setDestInput(item.name);
											}
										}}
										className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-3">
										<Clock className="w-4 h-4 text-gray-400" />
										<span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
									</button>
								))}
							</div>
						)}

						{/* No Results */}
						{!isSearching && results.length === 0 && (startInput !== "" || destInput !== "") && (
							<div className="px-4 py-8 text-center">
								<Search className="w-8 h-8 text-gray-300 dark:text-gray-700 mx-auto mb-2" />
								<p className="text-sm text-gray-500">No locations found</p>
								<p className="text-xs text-gray-400 mt-1">Try a different search term</p>
							</div>
						)}
					</div>
				)}
			</div>

			{/* Backdrop to close suggestions */}
			{isExpanded && (
				<div
					className="fixed inset-0 -z-10"
					onClick={() => {
						setIsExpanded(false);
						setActiveField(null);
					}}
				/>
			)}
		</div>
	);
};

export default EnhancedSearchBar;

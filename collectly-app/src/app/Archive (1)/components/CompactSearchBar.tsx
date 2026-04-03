"use client";

import { Input } from "@/components/ui/input";
import { useGeocoder } from "@/hooks/useGeocoder";
import { getCoordinatesForQuery } from "@/services/geocodingService";
import type { Coordinates, GeocodingResult } from "@/types/location";
import { QUICK_LOCATIONS } from "@/lib/constants";
import { MapPin, X, Loader2, Clock, Search as SearchIcon, Star } from "lucide-react";
import React, { useState, useRef } from "react";

interface CompactSearchBarProps {
	onStartChange: (coords: Coordinates) => void;
	onDestinationChange: (coords: Coordinates) => void;
	onResetGPS: () => void;
	isManualStart: boolean;
	userLocation: Coordinates | null;
}

type ActiveField = "start" | "destination" | null;

const CompactSearchBar: React.FC<CompactSearchBarProps> = ({
	onStartChange,
	onDestinationChange,
	onResetGPS,
	isManualStart,
	userLocation,
}) => {
	const [startInput, setStartInput] = useState("");
	const [destInput, setDestInput] = useState("");
	const [activeField, setActiveField] = useState<ActiveField>(null);
	const [showQuickLocations, setShowQuickLocations] = useState(false);
	const startInputRef = useRef<HTMLInputElement>(null);
	const destInputRef = useRef<HTMLInputElement>(null);

	const { results, isSearching, search, clear } = useGeocoder(userLocation);

	const handleSelect = (result: GeocodingResult) => {
		const selectedLabel = result.displayLabel || result.placeName || result.text;
		if (activeField === "start") {
			setStartInput(selectedLabel);
			onStartChange(result.center);
			setTimeout(() => destInputRef.current?.focus(), 100);
		} else if (activeField === "destination") {
			setDestInput(selectedLabel);
			onDestinationChange(result.center);
		}
		clear();
		setActiveField(null);
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
	};

	const handleStartInputChange = (value: string) => {
		setStartInput(value);
		setActiveField("start");
		if (value === "") {
			setShowQuickLocations(true);
			onResetGPS();
			clear();
		} else {
			setShowQuickLocations(false);
			search(value);
		}
	};

	const handleDestInputChange = (value: string) => {
		setDestInput(value);
		setActiveField("destination");
		if (value === "") {
			setShowQuickLocations(true);
			clear();
		} else {
			setShowQuickLocations(false);
			search(value);
		}
	};

	const handleQuickLocationSelect = (location: typeof QUICK_LOCATIONS[number]) => {
		const coords: Coordinates = [location.lon, location.lat];
		if (activeField === "start") {
			setStartInput(location.name);
			onStartChange(coords);
			setTimeout(() => destInputRef.current?.focus(), 100);
		} else if (activeField === "destination") {
			setDestInput(location.name);
			onDestinationChange(coords);
		}
		setShowQuickLocations(false);
		setActiveField(null);
	};

	return (
		<div className="space-y-2">
			{/* Start Location */}
			<div className="relative">
				<div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
					<div className="w-2 h-2 rounded-full bg-blue-500" />
				</div>
				<Input
					ref={startInputRef}
					className="h-11 pl-8 pr-8 text-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
					placeholder={isManualStart ? "Choose starting point" : "Your location"}
					value={startInput}
					onChange={(e) => handleStartInputChange(e.target.value)}
					onFocus={() => {
						setActiveField("start");
						if (startInput === "") setShowQuickLocations(true);
					}}
					onKeyDown={(e) => e.key === "Enter" && handleStartSearch()}
				/>
				{startInput && (
					<button
						onClick={() => {
							setStartInput("");
							onResetGPS();
							clear();
						}}
						className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
						<X className="w-3.5 h-3.5 text-gray-400" />
					</button>
				)}
			</div>

			{/* Destination */}
			<div className="relative">
				<div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
					<div className="w-2 h-2 rounded-full bg-red-500" />
				</div>
				<Input
					ref={destInputRef}
					className="h-11 pl-8 pr-8 text-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg focus-visible:ring-2 focus-visible:ring-red-500"
					placeholder="Choose destination"
					value={destInput}
					onChange={(e) => handleDestInputChange(e.target.value)}
					onFocus={() => {
						setActiveField("destination");
						if (destInput === "") setShowQuickLocations(true);
					}}
					onKeyDown={(e) => e.key === "Enter" && handleDestSearch()}
				/>
				{destInput && (
					<button
						onClick={() => {
							setDestInput("");
							clear();
						}}
						className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
						<X className="w-3.5 h-3.5 text-gray-400" />
					</button>
				)}
			</div>

			{/* Suggestions Dropdown */}
			{activeField && (showQuickLocations || results.length > 0 || isSearching) && (
				<div className="mt-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg max-h-80 overflow-y-auto">
					{/* Quick Locations - Show when field is empty */}
					{showQuickLocations && !isSearching && results.length === 0 && (
						<div className="py-1">
							<div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
								<Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
								Quick Access
							</div>
							{QUICK_LOCATIONS.map((location, index) => (
								<button
									key={index}
									onClick={() => handleQuickLocationSelect(location)}
									className="w-full text-left px-3 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors flex items-start gap-2.5 group">
									<span className="text-lg mt-0.5 shrink-0 group-hover:scale-110 transition-transform">{location.icon}</span>
									<div className="flex-1 min-w-0">
										<div className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
											{location.name}
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
											{location.address}
										</div>
									</div>
								</button>
							))}
						</div>
					)}

					{/* Search Results */}
					{isSearching && (
						<div className="p-4 text-center">
							<Loader2 className="w-5 h-5 animate-spin mx-auto text-gray-400 mb-2" />
							<p className="text-xs text-gray-500">Searching...</p>
						</div>
					)}

					{!isSearching && !showQuickLocations && results.length > 0 && (
						<div className="py-1">
							{results.map((result, index) => (
								<button
									key={index}
									onClick={() => handleSelect(result)}
									className="w-full text-left px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-start gap-2.5">
									<MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
									<div className="flex-1 min-w-0">
										<div className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
											{result.text}
										</div>
										{result.secondaryText && (
											<div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
												{result.secondaryText}
											</div>
										)}
									</div>
								</button>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CompactSearchBar;

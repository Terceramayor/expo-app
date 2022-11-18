import React from "react";
import { ImageBackground, ImageBackgroundProps } from "react-native";

const PLACEHOLDER_IMAGE = require('../assets/images/placeholder.jpg')

export default function ImageBackgroundWithPlaceholder ({ source, children, ...props }: ImageBackgroundProps & { children: React.ReactNode}) {
	const [error, setError] = React.useState<boolean>(false)
	return <ImageBackground source={error ? PLACEHOLDER_IMAGE : source} {...props} onError={() => setError(true)}>{children}</ImageBackground>
}

import React from "react";
import { Image, ImageProps } from "react-native";

const PLACEHOLDER_IMAGE = require('../assets/images/placeholder.jpg')

export default function ImageWithPlaceholder ({source, ...props}: ImageProps) {
	const [error, setError] = React.useState<boolean>(false)
	return <Image source={error ? PLACEHOLDER_IMAGE : source} {...props} onError={() => setError(true)} />
}

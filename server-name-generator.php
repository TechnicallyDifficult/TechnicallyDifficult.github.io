<?php

function getRandomWord($array)
{
	$index = mt_rand(0, sizeof($array) - 1);
	return $array[$index];
}

function generateName($adjs, $nouns)
{
	return getRandomWord($adjs) .  '-' . getRandomWord($nouns);
}

function pageController()
{
	$adjs = ['blue', 'small', 'good', 'inconspicuous', 'fun', 'stupid', 'windy', 'simple', 'unpropitious', 'heavy', 'foregone', 'tentative', 'cosmic', 'infinite', 'misunderstood', 'practical', 'verbal', 'accidental', 'egregious', 'irrevocable', 'symbiotic', 'musical', 'numeric', 'invaluable', 'lovable', 'lycanthropic', 'casual', 'guilty', 'insensitive', 'sincere', 'pragmatic', 'triangular', 'arbitrary', 'articulate', 'transdimensional', 'official', 'intriguing', 'inspiring', 'arrogant', 'soiled', 'furry', 'pretentious', 'precotious', 'imaginary', 'unsatisfactory', 'elaborate', 'precarious', 'unnerving', 'impetuous', 'traditional', 'garbled', 'systematic', 'liquid', 'poisonous', 'human', 'invalid', 'sliced', 'elastic', 'unresponsive', 'overused', 'intimate', 'desolate', 'simultaneous', 'surreal'];

	$nouns = ['potato', 'block', 'tree', 'explosion', 'fish', 'cheese', 'noun', 'onomatopoeia', 'pickle', 'dragon', 'octagon', 'hangover', 'shirt', 'garbage', 'velocity', 'toilet paper', 'objection', 'comfort', 'apparatus', 'concrete', 'prophecy', 'rubble', 'unicorn', 'vegetable', 'bullet', 'fragment', 'acquaintance', 'planet', 'perfection', 'insanity', 'unicycle', 'vent', 'signpost', 'igloo', 'paradox', 'mushroom', 'fury', 'stagnation', 'justice', 'impulse', 'operation', 'incineration', 'mustard', 'error', 'fact', 'rock', 'water', 'monster', 'electron', 'wall', 'stench', 'parade', 'peninsula', 'excuse', 'fallacy', 'disrespect', 'energy', 'aglet', 'questionmark', 'tarnation', 'fairy', 'fire', 'suspicion', 'negation'];

	$data = [];

	$data['name'] = generateName($adjs, $nouns);

	return $data;
}

extract(pageController());

?>

<!DOCTYPE html>
<html>
<head>
	<title>Server Name Generator</title>
	<style>
		body {
			font-family: sans-serif;
		}
	</style>
</head>
<body>
	<h1>
		<?= $name ?>
	</h1>
</body>
</html>
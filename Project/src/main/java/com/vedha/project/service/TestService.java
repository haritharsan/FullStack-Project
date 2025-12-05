package com.vedha.project.service;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.regex.*;

import org.springframework.stereotype.Service;
import com.vedha.project.dto.TestDto;

@Service
public class TestService {

	private static final int MAX_COMPLEXITY = 50;

	public List<TestDto> analyzeFiles(List<File> javaFiles) throws IOException {

		List<TestDto> results = new ArrayList<>();

		for (File file : javaFiles) {

			TestDto result = new TestDto();
			result.setFileName(file.getName());

			List<String> lines = Files.readAllLines(file.toPath());

			int codeLines = 0, commentLines = 0, blankLines = 0;
			int loopCount = 0, conditionalCount = 0, variableCount = 0;
			int complexity = 1;

			int maxLoopDepth = 0, maxConditionalDepth = 0;

			Map<String, Integer> variableTypeCount = new HashMap<>();
			Set<String> uniqueVariables = new HashSet<>();

			Pattern loopPattern = Pattern.compile("\\b(for|while|do)\\b");
			Pattern conditionalPattern = Pattern.compile("\\b(if|else if|switch|case)\\b");
			Pattern variablePattern = Pattern.compile("\\b(int|double|float|char|String|boolean|long|var)\\b");

			Deque<String> loopStack = new ArrayDeque<>();
			Deque<String> condStack = new ArrayDeque<>();

			for (String line : lines) {
				String trimmed = line.trim();

				if (trimmed.isEmpty()) {
					blankLines++;
					continue;
				}
				if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) {
					commentLines++;
					continue;
				}

				codeLines++;

				// Loops
				if (loopPattern.matcher(trimmed).find()) {
					loopCount++;
					loopStack.push("{");
					maxLoopDepth = Math.max(maxLoopDepth, loopStack.size());
				}

				// Conditionals
				if (conditionalPattern.matcher(trimmed).find()) {
					conditionalCount++;
					condStack.push("{");
					maxConditionalDepth = Math.max(maxConditionalDepth, condStack.size());
				}

				// Block closing
				for (char c : trimmed.toCharArray()) {
					if (c == '}') {
						if (!loopStack.isEmpty())
							loopStack.pop();
						if (!condStack.isEmpty())
							condStack.pop();
					}
				}

				// Variables
				Matcher variableMatcher = variablePattern.matcher(trimmed);
				while (variableMatcher.find()) {
					variableCount++;
					String type = variableMatcher.group(1);
					variableTypeCount.put(type, variableTypeCount.getOrDefault(type, 0) + 1);

					Matcher nameMatcher = Pattern.compile(type + "\\s+(\\w+)").matcher(trimmed);
					while (nameMatcher.find()) {
						uniqueVariables.add(nameMatcher.group(1));
					}
				}
			}

			// Complexity
			complexity += loopCount + conditionalCount + (variableCount / 2) + maxLoopDepth + maxConditionalDepth;
			int score = Math.min(100, (complexity * 100) / MAX_COMPLEXITY);

			// Basic metrics
			result.setCodeLines(codeLines);
			result.setCommentLines(commentLines);
			result.setBlankLines(blankLines);
			result.setLoopCount(loopCount);
			result.setConditionalCount(conditionalCount);
			result.setVariableCount(variableCount);
			result.setUniqueVariableCount(uniqueVariables.size());
			result.setVariableTypeCount(variableTypeCount);
			result.setComplexityLevel(complexity);
			result.setMaxLoopDepth(maxLoopDepth);
			result.setMaxConditionalDepth(maxConditionalDepth);
			result.setDifficultyScore(score);
			result.setDifficultyLevel(
					score <= 30 ? "Easy" : score <= 70 ? "Medium" : score <= 90 ? "Hard" : "Very Hard");

			// Naming convention check
			result.setNamingConventionConsistent(checkNamingConvention(lines));

			// AI FEATURES
			result.setProgramPurpose(detectProgramPurpose(lines, variableTypeCount, loopCount));
			result.setAdvancedInsights(generateDeepInsights(result));
			result.setStructureInsights(
					analyzeLineMetrics(codeLines + commentLines + blankLines, codeLines, commentLines, blankLines));

			List<String> extraChecks = runExtraAdvancedChecksReadable(lines);
			result.setExtraChecks(extraChecks);

			List<String> ultra = runUltraSmartAnalysis(lines);
			result.setUltraAnalysis(ultra);

			result.setProgramFlow(generateProgramFlow(lines));

			// 🔥 ADVANCED: Skill, Badge, Scores, Suggestions
			int skillScore = computeSkillScore(result, ultra, extraChecks);
			result.setSkillScore(skillScore);
			result.setSkillLevel(mapSkillLevel(skillScore));
			result.setBadge(assignBadge(skillScore));
			result.setSkillReason(buildSkillReason(result, ultra, extraChecks));

			result.setReadabilityScore(computeReadabilityScore(result));
			result.setEfficiencyScore(computeEfficiencyScore(result, extraChecks));
			result.setTimeComplexityEstimate(estimateTimeComplexity(ultra));
			result.setPerformanceRating(buildPerformanceRating(result.getEfficiencyScore()));
			result.setImprovementSuggestions(buildImprovementSuggestions(result, extraChecks, ultra));
			result.setLearningPath(recommendLearningPath(result.getSkillLevel()));

			results.add(result);
		}

		return results;
	}

	// ---------- Naming convention heuristic ----------
	private boolean checkNamingConvention(List<String> lines) {
		for (String line : lines) {
			String t = line.trim();
			// skip comments
			if (t.startsWith("//") || t.startsWith("/*") || t.startsWith("*"))
				continue;

			// simple check: words that look like VARIABLE or MethodName (starting
			// uppercase)
			if (t.matches(".*\\b[A-Z]{2,}\\b.*") || t.matches(".*\\b[A-Z][a-zA-Z0-9]+\\b.*")) {
				return false;
			}
		}
		return true;
	}

	// --------- PROGRAM TYPE AI ---------
	private String detectProgramPurpose(List<String> lines, Map<String, Integer> varCount, int loopCount) {

		int intCount = varCount.getOrDefault("int", 0);
		int stringCount = varCount.getOrDefault("String", 0);

		long mathOps = lines.stream().filter(l -> l.matches(".*[+\\-*/%=].*")).count();

		String type = "General Purpose Program";
		int confidence = 50;

		if (intCount > 5 && mathOps > 3) {
			type = "Mathematical / Calculation Based Program";
			confidence += 40;
		} else if (stringCount > 6) {
			type = "Text Processing Program";
			confidence += 35;
		} else if (loopCount > 2) {
			type = "Iterative / Pattern-Based Logic";
			confidence += 30;
		}

		return "Based on structure, this program is most likely:\n" + "➡ Category: " + type + "\n"
				+ "➡ Reason: numericVars=" + intCount + ", stringVars=" + stringCount + ", loops=" + loopCount
				+ ", operations=" + mathOps + "\n" + "➡ Confidence: " + confidence + "%";
	}

	// --------- STYLE & READABILITY AI ---------
	private List<String> generateDeepInsights(TestDto dto) {

		List<String> list = new ArrayList<>();
		list.add("\n🧠 AI Understanding of Your Code:");
		list.add("------------------------------------------");

		double density = (double) dto.getCodeLines()
				/ (dto.getCodeLines() + dto.getCommentLines() + dto.getBlankLines());

		list.add(
				density > 0.8 ? "→ Code is dense with logic and fewer comments. 📌 Might be harder to understand later."
						: density > 0.55 ? "→ Good balance between comments and code. 👍 Readable."
								: "→ Many blank/comment lines. Code may be easy to read but could be simplified.");

		if (dto.getLoopCount() > 3)
			list.add("⚠ Multiple loops → program may be processing large data repeatedly.");

		if (dto.getConditionalCount() > dto.getLoopCount() * 2)
			list.add("→ Heavy use of if/else → likely rule or decision-based logic.");

		return list;
	}

	// --------- COMMENT DENSITY ---------
	private String analyzeLineMetrics(int total, int code, int comments, int blanks) {
		if (code == 0)
			return "No executable code found.";

		double ratio = (double) comments / code * 100;

		if (ratio < 5)
			return "⚠ Very few comments found.\n→ Consider adding comments for better understanding.";
		else if (ratio < 15)
			return "✔ Good level of comments.\n→ Code is readable.";
		return "💡 Well documented.\n→ Good for teamwork and maintainability.";
	}

	// --------- EXTRA CHECKS ---------
	private List<String> runExtraAdvancedChecksReadable(List<String> lines) {

		List<String> insights = new ArrayList<>();
		Set<String> declared = new HashSet<>(), used = new HashSet<>();

		int nestedLoops = 0, depth = 0;
		boolean scannerUsed = false, tryCatchUsed = false;

		for (String line : lines) {
			String text = line.trim();

			if (text.matches(".*(int|String|double|float|long)\\s+\\w+.*;"))
				declared.add(text.replaceAll(".*\\s(\\w+).*", "$1"));

			for (String var : declared)
				if (text.contains(var))
					used.add(var);

			if (text.contains("Scanner"))
				scannerUsed = true;
			if (text.contains("try") || text.contains("catch"))
				tryCatchUsed = true;

			if (text.matches(".*(for|while).*\\{")) {
				depth++;
				if (depth > 1)
					nestedLoops++;
			}

			if (text.contains("}"))
				depth--;
		}

		declared.removeAll(used);

		if (!declared.isEmpty())
			insights.add("⚠ Unused variables found → " + declared + "\n→ Remove them to avoid confusion.");

		if (nestedLoops > 0)
			insights.add(
					"⚠ Nested loop detected → repeated loop inside loop.\n→ Performance may drop when input grows.");

		if (scannerUsed && !tryCatchUsed)
			insights.add(
					"⚠ User input detected without error handling.\n→ Program may crash if incorrect value entered.");

		return insights;
	}

	// --------- ULTRA PATTERN ANALYSIS ---------
	private List<String> runUltraSmartAnalysis(List<String> lines) {

		List<String> insights = new ArrayList<>();
		boolean recursion = false, sorting = false, pattern = false;
		int magicNumbers = 0, repeatedConditions = 0;
		Set<String> conditions = new HashSet<>();

		for (String line : lines) {
			String t = line.trim();

			// detect recursion
			if (t.contains("(") && t.contains(")") && !t.contains("if") && !t.contains("for") && !t.contains("while")) {
				String name = t.replaceAll(".*(\\w+)\\(.*", "$1");
				if (lines.stream().anyMatch(l -> l.contains(name + "(") && !l.contains("public")))
					recursion = true;
			}

			if (t.matches(".*\\b[0-9]+\\b.*"))
				magicNumbers++;

			if (t.startsWith("if") && !conditions.add(t))
				repeatedConditions++;

			if (t.contains("arr[i]") && t.contains("arr[j]"))
				sorting = true;

			if (t.contains("System.out.print"))
				pattern = true;
		}

		if (recursion)
			insights.add("🔁 Recursion detected → Method calling itself. Ensure proper base condition!");
		if (sorting)
			insights.add("🧮 Sorting logic pattern found → Likely bubble/selection sort.");
		if (pattern)
			insights.add("✨ Pattern printing detected → Loops used for output formatting.");
		if (magicNumbers > 3)
			insights.add("⚠ Many hardcoded numbers → Use constants for better readability.");
		if (repeatedConditions > 0)
			insights.add("⚠ Duplicate conditions found → Can refactor using functions/switch.");

		long loops = lines.stream().filter(l -> l.contains("for") || l.contains("while")).count();

		insights.add(recursion ? "📌 Estimated Complexity: O(n) − O(2^n) (recursion based)"
				: loops >= 2 ? "📌 Estimated Complexity: O(n²)"
						: loops == 1 ? "📌 Estimated Complexity: O(n)" : "📌 Estimated Complexity: O(1)");

		return insights;
	}

	// --------- FLOW DETECTOR ---------
	private List<String> generateProgramFlow(List<String> lines) {
		List<String> flow = new ArrayList<>();

		for (String line : lines) {
			String t = line.trim();
			if (t.contains("(") && t.contains("public"))
				flow.add("Method: " + t);
			if (t.contains("for") || t.contains("while"))
				flow.add("Loop: " + t);
			if (t.contains("if") || t.contains("else"))
				flow.add("Condition: " + t);
		}

		return flow;
	}

	// --------- SKILL SCORE / BADGE / LEARNING PATH ---------
	private int computeSkillScore(TestDto dto, List<String> ultra, List<String> extra) {
		int score = 0;

		if (dto.getLoopCount() > 0)
			score += 15;
		if (dto.getLoopCount() > 2)
			score += 10;
		if (dto.getConditionalCount() > 1)
			score += 10;
		if (dto.getCommentLines() > 3)
			score += 10;
		if (dto.isNamingConventionConsistent())
			score += 10;

		if (ultra.stream().anyMatch(s -> s.contains("Recursion")))
			score += 25;
		if (ultra.stream().anyMatch(s -> s.contains("Sorting")))
			score += 20;
		if (ultra.stream().anyMatch(s -> s.contains("Pattern")))
			score += 10;

		if (extra.stream().anyMatch(s -> s.contains("Nested loop")))
			score -= 15;
		if (extra.stream().anyMatch(s -> s.contains("Unused variables")))
			score -= 10;

		score = Math.max(0, Math.min(100, score));
		return score;
	}

	private String mapSkillLevel(int score) {
		if (score <= 20)
			return "🚼 Beginner";
		if (score <= 50)
			return "👨‍🎓 Intermediate";
		if (score <= 80)
			return "🧑‍💻 Advanced";
		return "🧠 Expert";
	}

	private String assignBadge(int score) {
		if (score <= 20)
			return "🐣 New Coder";
		if (score <= 50)
			return "📘 Growing Learner";
		if (score <= 80)
			return "🔥 Skilled Programmer";
		return "🏆 Master Coder";
	}

	private String buildSkillReason(TestDto dto, List<String> ultra, List<String> extra) {
		List<String> reasons = new ArrayList<>();

		if (dto.getLoopCount() > 0)
			reasons.add("Used loops");
		if (dto.getConditionalCount() > 0)
			reasons.add("Used conditional logic");
		if (dto.getCommentLines() > 0)
			reasons.add("Has some comments");
		if (dto.isNamingConventionConsistent())
			reasons.add("Consistency in naming");

		if (ultra.stream().anyMatch(s -> s.contains("Recursion")))
			reasons.add("Used recursion");
		if (ultra.stream().anyMatch(s -> s.contains("Sorting")))
			reasons.add("Sorting logic detected");
		if (ultra.stream().anyMatch(s -> s.contains("Pattern")))
			reasons.add("Pattern-based output");

		if (extra.stream().anyMatch(s -> s.contains("Nested loop")))
			reasons.add("But has nested loops (may be slow)");
		if (extra.stream().anyMatch(s -> s.contains("Unused variables")))
			reasons.add("Contains unused variables");

		return String.join(", ", reasons);
	}

	private int computeReadabilityScore(TestDto dto) {
		int score = 50;

		if (dto.getCommentLines() > 0)
			score += 10;
		if (dto.getCommentLines() > 3)
			score += 10;
		if (dto.isNamingConventionConsistent())
			score += 15;
		if (dto.getBlankLines() > 2)
			score += 5;

		score = Math.max(0, Math.min(100, score));
		return score;
	}

	private int computeEfficiencyScore(TestDto dto, List<String> extra) {
		int score = 100;

		if (dto.getLoopCount() > 3)
			score -= 15;
		if (dto.getMaxLoopDepth() > 1)
			score -= 15;
		if (extra.stream().anyMatch(s -> s.contains("Nested loop")))
			score -= 20;
		if (extra.stream().anyMatch(s -> s.contains("Unused variables")))
			score -= 10;

		score = Math.max(10, Math.min(100, score));
		return score;
	}

	private String estimateTimeComplexity(List<String> ultra) {
		return ultra.stream().filter(s -> s.contains("Estimated Complexity")).findFirst()
				.orElse("Time complexity not clearly detected.");
	}

	private String buildPerformanceRating(int efficiencyScore) {
		if (efficiencyScore >= 80)
			return "⚡ Fast & optimized";
		if (efficiencyScore >= 50)
			return "⚠ Average performance";
		return "🐌 Slow / Needs optimization";
	}

	private String buildImprovementSuggestions(TestDto dto, List<String> extra, List<String> ultra) {
		StringBuilder sb = new StringBuilder();

		if (extra.stream().anyMatch(s -> s.contains("Unused variables")))
			sb.append("• Remove unused variables to keep code clean.\n");

		if (extra.stream().anyMatch(s -> s.contains("Nested loop")))
			sb.append("• Try to reduce nested loops or optimize logic for large inputs.\n");

		if (dto.getCommentLines() < 3)
			sb.append("• Add more comments to explain complex logic.\n");

		if (!dto.isNamingConventionConsistent())
			sb.append("• Use consistent camelCase for variable and method names.\n");

		if (ultra.stream().anyMatch(s -> s.contains("Magic")))
			sb.append("• Replace magic numbers with named constants.\n");

		if (sb.length() == 0)
			return "✔ Code looks good. No major improvements needed.";
		return sb.toString();
	}

	private String recommendLearningPath(String skillLevel) {
		if (skillLevel.contains("Beginner"))
			return "📘 Focus: Variables, loops, if/else, simple functions. Practice small programs daily.";
		if (skillLevel.contains("Intermediate"))
			return "📗 Focus: OOP concepts, arrays, recursion, exception handling, and basic data structures.";
		if (skillLevel.contains("Advanced"))
			return "📙 Focus: Algorithms (sorting/searching), collections, design patterns, and performance tuning.";
		return "🏆 Focus: System design, architecture, clean code principles, and mentoring others.";
	}

	// --------- FILE FILTER ---------
	public List<File> getJavaFilesFromFiles(File[] files) {
		List<File> javaFiles = new ArrayList<>();
		for (File f : files)
			if (f.getName().endsWith(".java"))
				javaFiles.add(f);
		return javaFiles;
	}
}

package com.vedha.project.dto;

import java.util.List;
import java.util.Map;

public class TestDto {

	private String fileName;
	private int codeLines;
	private int commentLines;
	private int blankLines;
	private int loopCount;
	private int conditionalCount;
	private int variableCount;
	private int uniqueVariableCount;
	private Map<String, Integer> variableTypeCount;
	private int maxLoopDepth;
	private int maxConditionalDepth;
	private boolean namingConventionConsistent;
	private int complexityLevel;
	private int difficultyScore;
	private String difficultyLevel;

	// Flow & AI text modules
	private List<String> programFlow;
	private String programPurpose;
	private List<String> advancedInsights;
	private String structureInsights;
	private List<String> extraChecks;
	private List<String> ultraAnalysis;

	// Skill + advanced meta
	private int skillScore; // 0–100
	private String skillLevel; // Beginner / Intermediate / Advanced / Expert (with emoji)
	private String skillReason; // Optional explanation
	private String badge; // 🐣 / 📘 / 🔥 / 🧠 / 🏆

	private int readabilityScore; // 0–100
	private int efficiencyScore; // 0–100
	private String timeComplexityEstimate;
	private String performanceRating;
	private String improvementSuggestions;
	private String learningPath; // AI recommended path text

	// ====== getters / setters ======

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public int getCodeLines() {
		return codeLines;
	}

	public void setCodeLines(int codeLines) {
		this.codeLines = codeLines;
	}

	public int getCommentLines() {
		return commentLines;
	}

	public void setCommentLines(int commentLines) {
		this.commentLines = commentLines;
	}

	public int getBlankLines() {
		return blankLines;
	}

	public void setBlankLines(int blankLines) {
		this.blankLines = blankLines;
	}

	public int getLoopCount() {
		return loopCount;
	}

	public void setLoopCount(int loopCount) {
		this.loopCount = loopCount;
	}

	public int getConditionalCount() {
		return conditionalCount;
	}

	public void setConditionalCount(int conditionalCount) {
		this.conditionalCount = conditionalCount;
	}

	public int getVariableCount() {
		return variableCount;
	}

	public void setVariableCount(int variableCount) {
		this.variableCount = variableCount;
	}

	public int getUniqueVariableCount() {
		return uniqueVariableCount;
	}

	public void setUniqueVariableCount(int uniqueVariableCount) {
		this.uniqueVariableCount = uniqueVariableCount;
	}

	public Map<String, Integer> getVariableTypeCount() {
		return variableTypeCount;
	}

	public void setVariableTypeCount(Map<String, Integer> variableTypeCount) {
		this.variableTypeCount = variableTypeCount;
	}

	public int getMaxLoopDepth() {
		return maxLoopDepth;
	}

	public void setMaxLoopDepth(int maxLoopDepth) {
		this.maxLoopDepth = maxLoopDepth;
	}

	public int getMaxConditionalDepth() {
		return maxConditionalDepth;
	}

	public void setMaxConditionalDepth(int maxConditionalDepth) {
		this.maxConditionalDepth = maxConditionalDepth;
	}

	public boolean isNamingConventionConsistent() {
		return namingConventionConsistent;
	}

	public void setNamingConventionConsistent(boolean namingConventionConsistent) {
		this.namingConventionConsistent = namingConventionConsistent;
	}

	public int getComplexityLevel() {
		return complexityLevel;
	}

	public void setComplexityLevel(int complexityLevel) {
		this.complexityLevel = complexityLevel;
	}

	public int getDifficultyScore() {
		return difficultyScore;
	}

	public void setDifficultyScore(int difficultyScore) {
		this.difficultyScore = difficultyScore;
	}

	public String getDifficultyLevel() {
		return difficultyLevel;
	}

	public void setDifficultyLevel(String difficultyLevel) {
		this.difficultyLevel = difficultyLevel;
	}

	public List<String> getProgramFlow() {
		return programFlow;
	}

	public void setProgramFlow(List<String> programFlow) {
		this.programFlow = programFlow;
	}

	public String getProgramPurpose() {
		return programPurpose;
	}

	public void setProgramPurpose(String programPurpose) {
		this.programPurpose = programPurpose;
	}

	public List<String> getAdvancedInsights() {
		return advancedInsights;
	}

	public void setAdvancedInsights(List<String> advancedInsights) {
		this.advancedInsights = advancedInsights;
	}

	public String getStructureInsights() {
		return structureInsights;
	}

	public void setStructureInsights(String structureInsights) {
		this.structureInsights = structureInsights;
	}

	public List<String> getExtraChecks() {
		return extraChecks;
	}

	public void setExtraChecks(List<String> extraChecks) {
		this.extraChecks = extraChecks;
	}

	public List<String> getUltraAnalysis() {
		return ultraAnalysis;
	}

	public void setUltraAnalysis(List<String> ultraAnalysis) {
		this.ultraAnalysis = ultraAnalysis;
	}

	public int getSkillScore() {
		return skillScore;
	}

	public void setSkillScore(int skillScore) {
		this.skillScore = skillScore;
	}

	public String getSkillLevel() {
		return skillLevel;
	}

	public void setSkillLevel(String skillLevel) {
		this.skillLevel = skillLevel;
	}

	public String getSkillReason() {
		return skillReason;
	}

	public void setSkillReason(String skillReason) {
		this.skillReason = skillReason;
	}

	public String getBadge() {
		return badge;
	}

	public void setBadge(String badge) {
		this.badge = badge;
	}

	public int getReadabilityScore() {
		return readabilityScore;
	}

	public void setReadabilityScore(int readabilityScore) {
		this.readabilityScore = readabilityScore;
	}

	public int getEfficiencyScore() {
		return efficiencyScore;
	}

	public void setEfficiencyScore(int efficiencyScore) {
		this.efficiencyScore = efficiencyScore;
	}

	public String getTimeComplexityEstimate() {
		return timeComplexityEstimate;
	}

	public void setTimeComplexityEstimate(String timeComplexityEstimate) {
		this.timeComplexityEstimate = timeComplexityEstimate;
	}

	public String getPerformanceRating() {
		return performanceRating;
	}

	public void setPerformanceRating(String performanceRating) {
		this.performanceRating = performanceRating;
	}

	public String getImprovementSuggestions() {
		return improvementSuggestions;
	}

	public void setImprovementSuggestions(String improvementSuggestions) {
		this.improvementSuggestions = improvementSuggestions;
	}

	public String getLearningPath() {
		return learningPath;
	}

	public void setLearningPath(String learningPath) {
		this.learningPath = learningPath;
	}
}

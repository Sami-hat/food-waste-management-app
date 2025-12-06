import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth } = Dimensions.get("window");

export const legalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  lastUpdated: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
    fontStyle: "italic",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    marginLeft: 20,
    marginBottom: 8,
  },
  subSection: {
    marginTop: 12,
    marginBottom: 12,
  },
  subSectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  disclaimer: {
    backgroundColor: "#FFF9E6",
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#FFB800",
    marginBottom: 16,
  },
  disclaimerText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    fontWeight: "500",
  },
  link: {
    color: "#5295B7",
    textDecorationLine: "underline",
  },
  backButton: {
    backgroundColor: "#52B788",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  contactSection: {
    backgroundColor: "#E8F5F1",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  contactText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
});

import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export const preferencesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContainer: {
    paddingHorizontal: 0,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  checkboxText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    flex: 1,
  },

  customInputContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
  },

  customInputText: {
    fontSize: 14,
    color: "#333",
    minHeight: 80,
    textAlignVertical: "top",
    paddingTop: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#f8f8f8",
  },

  characterCount: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: 5,
  },

  buttonContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  saveButton: {
    backgroundColor: "#52B788",
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 14,
    paddingHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    color: "#5295B7",
    fontSize: 16,
    fontWeight: "600",
  },
});

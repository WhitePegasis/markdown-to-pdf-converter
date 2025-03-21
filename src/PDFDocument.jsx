import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import {remark} from "remark";
import remarkGfm from "remark-gfm";
import strip from "strip-markdown";

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    wordWrap: "break-word",
  },
  bulletPoint: {
    fontSize: 12,
    marginLeft: 10,
  },
});

const parseMarkdown = (markdown) => {
  return remark().use(remarkGfm).use(strip).processSync(markdown).toString();
};

const PDFDocument = ({ markdown }) => {
  const parsedText = parseMarkdown(markdown);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {parsedText.split("\n").map((line, index) => (
            <Text key={index} style={styles.text}>
              {line.trim()}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;

import java.io.*;
import java.util.*;

public class GenJson {
	static final int NUM_ROW = 5000;
	static final int NUM_COL = 14;
	static final int CELL_MAX_LENGTH = 128;
	static final String REPEAT_CHAR = "c";
	static final String OUTPUT_FILE = "data.json";
	
	public static void main(String[] args) {
		String html = generateTable();
		
		BufferedWriter writer = null;
		try {
			writer = new BufferedWriter(new FileWriter(OUTPUT_FILE));
			writer.write(html);
		} catch (IOException e) {
		} finally {
			try {
				if (writer != null) {
					writer.close();
				}
			} catch (IOException e) {
			}
		}
	}
	
	private static String generateTable() {
		List<String> data = new ArrayList<String>();
		for (int row = 1; row <= NUM_ROW; row++) {
			data.add(generateRow(row));
		}
		return "[" + String.join(",  " , data) + "]";
	}
	
	private static String generateRow(int row) {
		List<String> data = new ArrayList<String>();
		for (int col = 1; col <= NUM_COL; col++) {
			data.add(generateCell(row, col));
		}
		return "[" + String.join(",  " , data) + "]";
	}
	
	private static String generateCell(int row, int col) {
		String index = " " + row + ", " + col;
		int numToRepeat = CELL_MAX_LENGTH - index.length();
		String repeat = "";
		for (int i = 0; i <= numToRepeat; i++) {
			int value = i % 10;
			repeat += value == 0 ? " " : value;
		}
		return "\"" + repeat + index + "\"";
	}
}
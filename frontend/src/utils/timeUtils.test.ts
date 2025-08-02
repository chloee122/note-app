import { formatUpdateTime } from "./timeUtils";

describe("formatUpdateTime", () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime("2024-12-18T12:00:00.459Z");
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe("Just now threshold", () => {
    test('should return "Just now" for 1 second ago', () => {
      const date = new Date("2024-12-18T11:59:59.459Z").toISOString();
      expect(formatUpdateTime(date)).toBe("Just now");
    });

    test('should return "Just now" for 4 seconds ago', () => {
      const date = new Date("2024-12-18T11:59:56.459Z").toISOString();
      expect(formatUpdateTime(date)).toBe("Just now");
    });

    test("should return seconds for 5 seconds ago", () => {
      const date = new Date("2024-12-18T11:59:55.459Z").toISOString();
      expect(formatUpdateTime(date)).toBe("5 seconds ago");
    });
  });

  describe("seconds", () => {
    test("should return seconds for 10 seconds ago", () => {
      const date = new Date("2024-12-18T11:59:50.459Z").toISOString();
      expect(formatUpdateTime(date)).toBe("10 seconds ago");
    });

    test("should return seconds for 59 seconds ago", () => {
      const date = new Date("2024-12-18T11:59:01.459Z").toISOString();
      expect(formatUpdateTime(date)).toBe("59 seconds ago");
    });
  });

  describe("minutes", () => {
    test('should return "A minute ago" for exactly 1 minute ago', () => {
      const date = new Date("2024-12-18T11:59:00.459Z").toISOString();
      expect(formatUpdateTime(date)).toBe("A minute ago");
    });

    test("should return minutes for 59 minutes ago", () => {
      const date = new Date("2024-12-18T11:01:00.459Z").toISOString();
      expect(formatUpdateTime(date)).toBe("59 minutes ago");
    });
  });

  describe("hours", () => {
    test('should return "An hour ago" for exactly 1 hour', () => {
      const date = new Date("2024-12-18T11:00:00.459Z").toISOString();
      expect(formatUpdateTime(date)).toBe("An hour ago");
    });

    test("should return hours for 23 hours ago", () => {
      const date = new Date("2024-12-17T13:00:00.459Z").toISOString();
      expect(formatUpdateTime(date)).toBe("23 hours ago");
    });
  });

  describe("days", () => {
    test("should return formatted day for exactly 24 hours ago", () => {
      const date = new Date("2024-12-17T12:00:00.459Z").toISOString();
      const result = formatUpdateTime(date);
      expect(result).not.toMatch("ago");
      expect(result).toMatch("Dec");
    });

    test("should return formatted day for a week ago", () => {
      const date = new Date("2024-12-10T12:00:00.459Z").toISOString();
      const result = formatUpdateTime(date);
      expect(result).not.toMatch("ago");
      expect(result).toMatch("Dec");
    });

    test("should return formatted day for a year ago", () => {
      const date = new Date("2023-12-17T12:00:00.459Z").toISOString();
      const result = formatUpdateTime(date);
      expect(result).not.toMatch("ago");
      expect(result).toMatch("Dec");
    });
  });

  describe("edge cases", () => {
    test('should return "Just now" for future time', () => {
      const date = new Date("2024-12-18T12:05:00.459Z").toISOString();
      expect(formatUpdateTime(date)).toBe("Just now");
    });
  });
});

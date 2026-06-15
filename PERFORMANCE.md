# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries

- **Commit duration**: N/A ([Trainer's comment](https://discord.com/channels/794806036506607647/1333748258098380820/1515111545905090610))
- **Render duration**: 416 ms
- **Screenshot**: ![screenshot](/screenshots/baseline/sort.png)

### Interaction B: Search countries

- **Commit duration**: N/A ([Trainer's comment](https://discord.com/channels/794806036506607647/1333748258098380820/1515111545905090610))
- **Render duration**: 178.5 ms
- **Screenshot**: ![screenshot](/screenshots/baseline/search.png)

### Interaction C: Change year

- **Commit duration**: N/A ([Trainer's comment](https://discord.com/channels/794806036506607647/1333748258098380820/1515111545905090610))
- **Render duration**: 426.8 ms
- **Screenshot**: ![screenshot](/screenshots/baseline/change-year.png)

### Interaction D: Toggle column

- **Commit duration**: N/A ([Trainer's comment](https://discord.com/channels/794806036506607647/1333748258098380820/1515111545905090610))
- **Render duration**: 397.8 ms
- **Screenshot**: ![screenshot](/screenshots/baseline/toggle-column.png)

## Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: N/A ([Trainer's comment](https://discord.com/channels/794806036506607647/1333748258098380820/1515111545905090610))
- **Render duration**: 30.9 ms
- **Screenshot**: ![screenshot](/screenshots/optimized/sort.png)

### Interaction B: Search countries

- **Commit duration**: N/A ([Trainer's comment](https://discord.com/channels/794806036506607647/1333748258098380820/1515111545905090610))
- **Render duration**: 40.3 ms
- **Screenshot**: ![screenshot](/screenshots/optimized/search.png)

### Interaction C: Change year

- **Commit duration**: N/A ([Trainer's comment](https://discord.com/channels/794806036506607647/1333748258098380820/1515111545905090610))
- **Render duration**: 33.4 ms
- **Screenshot**: ![screenshot](/screenshots/optimized/change-year.png)

### Interaction D: Toggle column

- **Commit duration**: N/A ([Trainer's comment](https://discord.com/channels/794806036506607647/1333748258098380820/1515111545905090610))
- **Render duration**: 25.4 ms
- **Screenshot**: ![screenshot](/screenshots/optimized/toggle-column.png)

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | 416           | 30.9           | 92.57%      |
| Search countries | 178.5         | 40.3           | 77.42%      |
| Change year      | 426.8         | 33.4           | 92.17%      |
| Toggle column    | 397.8         | 25.4           | 93.61%      |
| **Average**      | **353.275**   | **32.5**       | **90.8%**   |

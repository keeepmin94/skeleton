import { Module } from '@nestjs/common';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import { utilities, WinstonModule } from 'nest-winston';
import { ConfigService } from '@nestjs/config';

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const levelValue = process.env.NODE_ENV === 'production' ? 'info' : 'silly';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: levelValue,
          format: winston.format.combine(
            winston.format.timestamp(),
            //utilities.format.nestLike(`${configService.get('server.name')}`, { prettyPrint: true }),
            winston.format.prettyPrint({ colorize: true }),
            winston.format.label({ label: `Skeleton Project` }),
            winston.format.printf(({ level, message, label, timestamp }) => {
              let logColor;

              switch (level) {
                case 'log':
                  logColor = '\x1b[34m'; // 파란색
                  break;
                case 'error':
                  logColor = '\x1b[31m'; // 빨간색
                  break;
                case 'warn':
                  logColor = '\x1b[33m'; // 노란색
                  break;
                default:
                  logColor = '\x1b[37m'; // 흰색
                  break;
              }

              return `[${label}] ${logColor}${timestamp} [${level.toUpperCase()}] - ${message}\x1b[0m`; // [프로젝트명] 시간 [로그레벨] 메세지
            }),
          ),
        }),

        // 로그 파일 생성
        // new winstonDaily({
        //   level: levelValue,
        //   format: winston.format.combine(
        //     winston.format.timestamp({
        //       format: 'YYYY-MM-DD HH:mm:ss',
        //     }),
        //     winston.format.printf(
        //       (info) => `[${info.timestamp}] ${configService.get('server.name')}.${info.level}: ${info.message}`,
        //     ),
        //   ),
        //   dirname: 'logs',
        //   filename: `%DATE%.log`,
        //   datePattern: 'YYYY-MM-DD',
        //   zippedArchive: true,
        //   maxSize: '20m',
        //   maxFiles: '14d',
        // }),
      ],
    }),
  ],
})
export class LoggerModule {}

// configService 비동기 동적모듈 사용시
// WinstonModule.forRootAsync({
//   inject: [ConfigService],
//   useFactory: (configService: ConfigService) => {
//     return {
//       transports: [
//         new winston.transports.Console({
//           level: levelValue,
//           format: winston.format.combine(
//             winston.format.timestamp(),
//             //utilities.format.nestLike(`${configService.get('server.name')}`, { prettyPrint: true }),
//             winston.format.prettyPrint({ colorize: true }),
//             winston.format.label({ label: `${configService.get('server.name')}` }),
//             winston.format.printf(({ level, message, label, timestamp }) => {
//               let logColor;

//               switch (level) {
//                 case 'log':
//                   logColor = '\x1b[34m'; // 파란색
//                   break;
//                 case 'error':
//                   logColor = '\x1b[31m'; // 빨간색
//                   break;
//                 case 'warn':
//                   logColor = '\x1b[33m'; // 노란색
//                   break;
//                 default:
//                   logColor = '\x1b[37m'; // 흰색
//                   break;
//               }

//               return `[${label}] ${logColor}${timestamp} [${level.toUpperCase()}] - ${message}\x1b[0m`; // [프로젝트명] 시간 [로그레벨] 메세지
//             }),
//           ),
//         }),

//         // 로그 파일 생성
//         // new winstonDaily({
//         //   level: levelValue,
//         //   format: winston.format.combine(
//         //     winston.format.timestamp({
//         //       format: 'YYYY-MM-DD HH:mm:ss',
//         //     }),
//         //     winston.format.printf(
//         //       (info) => `[${info.timestamp}] ${configService.get('server.name')}.${info.level}: ${info.message}`,
//         //     ),
//         //   ),
//         //   dirname: 'logs',
//         //   filename: `%DATE%.log`,
//         //   datePattern: 'YYYY-MM-DD',
//         //   zippedArchive: true,
//         //   maxSize: '20m',
//         //   maxFiles: '14d',
//         // }),
//       ],
//     };
//   },
// }),
